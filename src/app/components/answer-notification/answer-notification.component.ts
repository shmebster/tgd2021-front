import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { interval, Observable, Subject } from "rxjs";
import { EventService } from "../../services/event.service";
import { filter, map, take, takeUntil, tap } from "rxjs/operators";
import { Participant } from "../../../types/participant";
import { animate, style, transition, trigger } from "@angular/animations";
import { getAudioPath, getAudioPathWithTemplate } from "../../helper/tts.helper";
import { VoiceService } from "../../services/voice.service";

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
    announceAudio = true;
    audioSrc: string;
    private destroyed$ = new Subject<void>();

    constructor(private apiService: ApiService, private eventService: EventService, private voiceService: VoiceService) {
        this.eventService.answerReceivedEvent.pipe(
            takeUntil(this.destroyed$),
            map(e => e.data)
        ).subscribe(d => this.showNotification(d.telegramId, true, d.validAnswer));
        this.eventService.wrongAnswerEvent.pipe(
            takeUntil(this.destroyed$),
            map(e => e.data)
        ).subscribe(d => this.showNotification(d.telegramId, false, d.validAnswer));
        this.eventService.scoreChangedEvent.pipe(
            takeUntil(this.destroyed$),
            map(e => e.data),
        ).subscribe(e => {
           if(e.telegramId === this.participant.telegramId) {
               this.participant.score = e.newScore
           }
        });
    }

    showNotification(telegramId: number, validAnswer: boolean, validAnswerValue: string) {
        this.countdown = validAnswer ? 10 : 5;
        this.apiService.getParticipant(telegramId).subscribe(p => {
            this.participant = p;
            this.isShown = true;
            this.answerIsValid = validAnswer;
            const template = validAnswer ? 'announce-valid' : 'announce-invalid';
            const templateData: { [index: string]: string} = {};
            templateData['user'] =  p.name;
            templateData['answer'] = validAnswerValue;
            this.voiceService.playAudio(getAudioPathWithTemplate(template, '', templateData));
            this.showCountdown = true;
        })
    }

    countdownCompleted() {
        console.log(`countdown-completed`);
        this.showCountdown = false;
        this.isShown = false;
        this.announceAudio = false;
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
