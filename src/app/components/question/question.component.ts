import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { filter, map, takeUntil } from "rxjs/operators";
import { Subject, Subscription } from "rxjs";
import { Question } from "../../../types/question";
import { EventService } from "../../services/event.service";
import { QuestionChangedEvent } from "../../../types/server-event";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy  {
  @Input() question: Question;
  destroyed$ = new Subject<void>();
  private questionSubscription: Subscription;


  constructor(private apiService:ApiService, private eventService: EventService) { }
  ngOnInit(): void {
    if(this.question) {
      return;
    }
    this.getQuestion();
    this.questionSubscription = this.eventService.questionChangedEvent.subscribe(() =>{
      this.getQuestion();
    });

  }

  getQuestion() {
    this.apiService.getQuestion().pipe(
        takeUntil(this.destroyed$)
    ).subscribe(r => {
      this.question = r;
    });
  }

  ngOnDestroy() {
    console.log(`subs detroyed`);
    if (this.questionSubscription) {
      this.questionSubscription.unsubscribe();
    }
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
