import { Component, Input, OnInit } from '@angular/core';
import { EventGameQueue, QueueTypes } from "../../../types/server-event";
import { Participant } from "../../../types/participant";
import { ApiService } from "../../services/api.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Question } from "../../../types/question";

@Component({
  selector: 'app-game-queue',
  templateUrl: './game-queue.component.html',
  styleUrls: ['./game-queue.component.scss']
})
export class GameQueueComponent implements OnInit {
  @Input() action: EventGameQueue;
  readonly gameQueueTypes = QueueTypes
  participant: Participant;
  destroyed$ = new Subject<void>();
  penalty = '';
  countdown: number;
  showCountdown: boolean;
  question: Question = new Question();
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getParticipant(this.action.target).pipe(
        takeUntil(this.destroyed$)
    ).subscribe(e => {
      this.participant = e;
    });
    if(this.action.type === this.gameQueueTypes.penalty) {
      this.getPenalty();
    }
    if(this.action.type === this.gameQueueTypes.additionalQuestion) {
      this.getAdditionalQuestion();
    }
  }

  getPenalty() {
    this.apiService.getPenalty().pipe(
        takeUntil(this.destroyed$),
    ).subscribe((penalty) => {
      this.penalty = penalty.text;
      this.countdown = 10;
      this.showCountdown = true;
    });
  }

  countdownCompleted() {
    this.showCountdown = false;
  }

  private getAdditionalQuestion() {
    this.apiService.getAdditionalQuestion(this.action.target).subscribe(e => {
      this.question = e;
    })
  }
}
