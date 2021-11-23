import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { interval, Observable, Subject } from "rxjs";
import { EventService } from "../../services/event.service";
import { filter, map, take, takeUntil, tap } from "rxjs/operators";
import { Participant } from "../../../types/participant";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
    selector: 'app-answer-notification',
    templateUrl: './answer-notification.component.html',
    styleUrls: ['./answer-notification.component.scss'],
    animations: [
        trigger(
            'inOutAnimation',
            [
                transition(
                    ':enter',
                    [
                        style({height: 0, opacity: 0}),
                        animate('0.5s ease-out',
                            style({height: '100%', opacity: 1}))
                    ]
                ),
                transition(
                    ':leave',
                    [
                        style({height: '100%', opacity: 1}),
                        animate('1s ease-in',
                            style({height: 0, opacity: 0}))
                    ]
                )
            ]
        ),
        trigger('counter', [
            transition('* => *', [
                style( {
                    opacity: 0,
                    bottom: '-100%',
                }),
                animate('0.3s', style( {
                    opacity: 0.9,
                    bottom: '0',
                }))
            ]),
        ])
    ]
})
export class AnswerNotificationComponent implements OnInit, OnDestroy {
    isShown = false;
    answerIsValid = false;
    participant: Participant;
    timer: Observable<any>;
    countdown = 10;
    showCountdown = false;
    private destroyed$ = new Subject<void>();

    constructor(private apiService: ApiService, private eventService: EventService) {
        this.eventService.answerReceivedEvent.pipe(
            takeUntil(this.destroyed$),
            map(e => e.data)
        ).subscribe(d => this.showNotification(d.telegramId, true));
        this.eventService.wrongAnswerEvent.pipe(
            takeUntil(this.destroyed$),
            map(e => e.data)
        ).subscribe(d => this.showNotification(d.telegramId, false));
        this.eventService.scoreChangedEvent.pipe(
            takeUntil(this.destroyed$),
            map(e => e.data),
        ).subscribe(e => {
           if(e.telegramId === this.participant.telegramId) {
               this.participant.score = e.newScore
           }
        });
    }

    showNotification(telegramId: number, validAnswer: boolean) {
        this.countdown = validAnswer ? 10 : 5;
        this.apiService.getParticipant(telegramId).subscribe(p => {
            this.participant = p;
            this.isShown = true;
            this.answerIsValid = validAnswer;
            this.showCountdown = true;
        })
    }

    countdownCompleted() {
        console.log(`countdown-completed`);
        this.showCountdown = false;
        this.isShown = false;
        this.countdown = 10;
        this.apiService.continueGame().subscribe(r => console.log(r));
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

}
