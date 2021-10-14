import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { interval, Observable, Subject } from "rxjs";
import { EventService } from "../../services/event.service";
import {  map, take, takeUntil, tap } from "rxjs/operators";
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
                        style({height: 300, opacity: 1}),
                        animate('1s ease-in',
                            style({height: 0, opacity: 0}))
                    ]
                )
            ]
        )
    ]
})
export class AnswerNotificationComponent implements OnInit, OnDestroy {
    isShown = true;
    answerIsValid = false;
    participant: Participant;
    timer: Observable<any>;
    countdown = 10;
    private destroyed$ = new Subject<void>();
    private t$: Observable<number>;

    constructor(private apiService: ApiService, private eventService: EventService) {
        this.eventService.answerReceivedEvent.pipe(
            takeUntil(this.destroyed$),
            map(e => e.data)
        ).subscribe(d => this.showNotification(d.telegramId, true));
        this.eventService.wrongAnswerEvent.pipe(
            takeUntil(this.destroyed$),
            map(e => e.data)
        ).subscribe(d => this.showNotification(d.telegramId, false));
    }

    showNotification(telegramId: number, validAnswer: boolean) {
        this.countdown = validAnswer ? 10 : 5;
        this.apiService.getParticipant(telegramId).subscribe(p => {
            this.participant = p;
            this.isShown = true;
            this.answerIsValid = validAnswer;
            this.beginCountdown().subscribe({
                next: (i) => {
                    this.countdown = i;
                },
                complete: () => {
                    this.countdown = 10;
                    this.isShown = false;
                }
            });
        })
    }

    beginCountdown() {
        return interval(1000).pipe(take(this.countdown + 1), map(x => 10 - x));
    }

    ngOnInit(): void {
        this.beginCountdown();
    }

    ngOnDestroy(): void {
        this.destroyed$.complete();
    }

}
