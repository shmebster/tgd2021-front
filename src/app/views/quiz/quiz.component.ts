import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from "../../services/event.service";
import { Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { EventGameQueue, QueueTypes } from "../../../types/server-event";
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  showQuestion = true;
  showGameQueue = false;
  destroyed$ = new Subject<void>();
  gameQueueAction: EventGameQueue  = {
    _id: '',
    target: 11178819,
    completed: false,
    type: QueueTypes.giveOutAPrize,
  }
  gamePaused = false;
  constructor(private eventService: EventService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.eventService.gameQueueEvent.pipe(
        takeUntil(this.destroyed$),
        map(e => e.data)
    ).subscribe(e => {
      this.gameQueueAction = e;
      this.showQuestion = false;
      this.showGameQueue = true;
    })
    this.eventService.gamePaused.pipe(takeUntil(this.destroyed$)).subscribe(e => this.gamePaused = true);
    this.eventService.gameResumed.pipe(takeUntil(this.destroyed$)).subscribe(e => this.gamePaused = false);

    this.eventService.queueCompleted.pipe(
        takeUntil(this.destroyed$),
    ).subscribe(e => {
      this.showQuestion = true;
      this.showGameQueue = false;
    });
    this.apiService.getGameState().subscribe(e => {
      this.gamePaused = e.value === 'paused' ? true : false;
      console.log(this.gamePaused);
    })
  }
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
