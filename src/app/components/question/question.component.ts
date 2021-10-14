import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { filter, map, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Question } from "../../../types/question";
import { EventService } from "../../services/event.service";
import { QuestionChangedEvent } from "../../../types/server-event";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy  {
  question = new Question();
  destroyed$ = new Subject<void>();

  constructor(private apiService:ApiService, private eventService: EventService) { }
  ngOnInit(): void {
    this.apiService.getQuestion().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(r => {
      this.question = r;
    });
    this.eventService.questionChangedEvent.pipe(
        takeUntil(this.destroyed$),
        map(e => e.data),
    ).subscribe((q: QuestionChangedEvent) => {
      console.log(q);
      this.question = q;
    });
  }
  ngOnDestroy() {
    this.destroyed$.complete();
  }

}
