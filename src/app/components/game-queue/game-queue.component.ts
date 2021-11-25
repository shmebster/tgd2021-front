import { Component, Input, OnInit } from '@angular/core';
import { EventGameQueue, QueueTypes } from "../../../types/server-event";
import { Participant } from "../../../types/participant";
import { ApiService } from "../../services/api.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Question } from "../../../types/question";
import { getAudioPath } from "../../helper/tts.helper";
import { PrizeDto } from "../../../types/prize.dto";

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
  showQuestion = false;
  showPrize = false;
  prize: PrizeDto;
  countdownCompleted$: Subject<void> = new Subject<void>();
  prizeAudioSrc: string;
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
      this.getAdditionalQuestion()
    }

    if(this.action.type === this.gameQueueTypes.giveOutAPrize) {
      this.countdown = 10;
      this.showCountdown = true;
      this.countdownCompleted$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
        this.getPrize();
      });

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
    this.countdownCompleted$.next();
  }

  private getAdditionalQuestion() {
    this.apiService.getAdditionalQuestion(this.action.target).subscribe(e => {
      this.question = e;
      this.showQuestion = true;
    })
  }

    getAudio(penalty: string) {
        return getAudioPath(penalty);
    }

  private getPrize() {
    this.apiService.getPrize().pipe(takeUntil(this.destroyed$)).subscribe((r) => {
      this.prize = r;
      this.showPrize = true;
      this.prizeAudioSrc = getAudioPath(`Поздавляю, ${this.participant.name} получает ${this.prize.name}`);
    });
  }
}
