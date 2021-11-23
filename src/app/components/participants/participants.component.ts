import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Participant } from "../../../types/participant";
import { EventService } from "../../services/event.service";
import { filter, map, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { EventUserAdded } from "../../../types/server-event";

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit, OnDestroy {
  @Input() small = false;
  participants: Participant[] = [];
  destroyed$ = new Subject<void>();
  constructor(private apiService: ApiService, private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.userAddedEvent.pipe(
        takeUntil(this.destroyed$),
        map(e => e.data),
    ).subscribe(e => this.updateParticipants());
    this.eventService.scoreChangedEvent.pipe(
        takeUntil(this.destroyed$),
        map(e => e.data),
    ).subscribe(data => {
      const player = this.participants.find(x => x.telegramId === data.telegramId);
      if (player) {
        player.score = data.newScore
      }
    })
    this.updateParticipants();
  }

  updateParticipants() {
    this.apiService.getParticipants().subscribe((r) => {
      this.participants = r;

    });
  }

  ngOnDestroy() {
    this.destroyed$.complete();
  }

}
