import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { filter, map, takeUntil } from "rxjs/operators";
import { Subject, Subscription } from "rxjs";
import { Question } from "../../../types/question";
import { EventService } from "../../services/event.service";
import { QuestionChangedEvent } from "../../../types/server-event";
import { VoiceService } from "../../services/voice.service";
import { API_URL } from "../../../app.constants";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy  {
  @Input() question: Question;
  destroyed$ = new Subject<void>();
  private questionSubscription: Subscription;


  constructor(private apiService:ApiService, private eventService: EventService, private voiceService: VoiceService) { }
  ngOnInit(): void {
    if(this.question) {
      this.voiceService.playAudio(this.voiceService.getAudioUrl(this.question.text));
      return;
    }
    setTimeout(() => this.getQuestion(), 3000);
    this.questionSubscription = this.eventService.questionChangedEvent.subscribe(() =>{
      this.getQuestion();
    });

  }

  getQuestion() {
    this.apiService.getQuestion().pipe(
        takeUntil(this.destroyed$)
    ).subscribe(r => {
      if (this.question && this.question.text === r.text) {
        return;
      }
      this.question = r;
      this.voiceService.playAudio(this.voiceService.getAudioUrl(r.text));
    });
  }

  ngOnDestroy() {
    if (this.questionSubscription) {
      this.questionSubscription.unsubscribe();
    }
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
