import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Participant } from "../../../types/participant";
import { EventService } from "../../services/event.service";
import { Observable, Subject, Subscription } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { EventPhotosUpdatedData, ServerEvent } from "../../../types/server-event";
import { API_URL } from "../../../app.constants";

@Component({
  selector: 'app-participant-item',
  templateUrl: './participant-item.component.html',
  styleUrls: ['./participant-item.component.scss']
})
export class ParticipantItemComponent implements OnInit, OnDestroy {
  @Input() participant: Participant;
  @Input() small = false;
  private destroyed$ = new Subject<void>();
  imgTimestamp = (new Date()).getTime();
  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.eventService.eventEmitter.pipe(
      takeUntil(this.destroyed$),
      filter(e => e.event === 'photos_updated' && (e.data as EventPhotosUpdatedData).id === this.participant.telegramId)
    ).subscribe((e) => {
      console.log(e);
      console.log(`photo were updated`);
      this.imgTimestamp = (new Date()).getTime();
    })
  }
  ngOnDestroy() {
    this.destroyed$.complete();
  }


  getImageUrl() {
    return `${API_URL}/guests/photo/${this.participant.telegramId}?$t=${this.imgTimestamp}`;
  }
}
