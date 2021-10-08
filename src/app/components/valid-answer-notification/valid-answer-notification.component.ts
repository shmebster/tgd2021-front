import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Subject } from "rxjs";
import { EventService } from "../../services/event.service";
import { filter, map, takeUntil, tap } from "rxjs/operators";
import { EventAnswerReceived } from "../../../types/server-event";
import { Participant } from "../../../types/participant";
import { animate, keyframes, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-valid-answer-notification',
  templateUrl: './valid-answer-notification.component.html',
  styleUrls: ['./valid-answer-notification.component.scss'],
  animations: [
    trigger(
        'inOutAnimation',
        [
          transition(
              ':enter',
              [
                style({ height: 0, opacity: 0 }),
                animate('0.5s ease-out',
                    style({ height: '100%', opacity: 1 }))
              ]
          ),
          transition(
              ':leave',
              [
                style({ height: 300, opacity: 1 }),
                animate('1s ease-in',
                    style({ height: 0, opacity: 0 }))
              ]
          )
        ]
    )
  ]
})
export class ValidAnswerNotificationComponent implements OnInit, OnDestroy {
  isShown = false;
  private destroyed = new Subject<void>();
  participant: Participant;

  constructor(private apiService: ApiService, private eventService: EventService) {
    this.eventService.eventEmitter.pipe(
        takeUntil(this.destroyed),
        filter(e => e.event === 'answer_received'),
        map(e => e.data as EventAnswerReceived)
    ).subscribe(d => {
      console.log(d);
      this.apiService.getParticipant(d.telegramId).subscribe(p => {
        this.participant = p;
        this.isShown = true;
      })
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroyed.complete();
  }

}
