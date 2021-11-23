import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from "../../../services/event.service";
import { Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { EventGameQueue, QueueTypes } from "../../../../types/server-event";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: 'app-queue-actions',
  templateUrl: './queue-actions.component.html',
  styleUrls: ['./queue-actions.component.scss']
})
export class QueueActionsComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<void>()
  constructor(private eventService: EventService, private apiService: ApiService) { }
  gameQueue: EventGameQueue | null;

  ngOnInit(): void {
    this.eventService.gameQueueEvent.pipe(
        takeUntil(this.destroyed$),
        map(e => e.data),
    ).subscribe(e => {
      this.gameQueue = e;
    });
  }
  ngOnDestroy() {
    this.destroyed$.complete();
  }

  markAsCompleted(_id: string) {
    this.apiService.markQueueAsCompleted(_id).subscribe((r) => {
      // this.gameQueue = null;
    })
  }
}
