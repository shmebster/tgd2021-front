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
    this.eventService.eventEmitter.pipe(
        takeUntil(this.destroyed$),
        filter((e) => e.event === 'user_added'),
        map(e => e.data as EventUserAdded)
    ).subscribe(d => {
      this.updateParticipants();
    });

    this.updateParticipants();
  }

  updateParticipants() {
    this.apiService.getParticipants().subscribe((r) => {
      console.log(r);
      this.participants = r;
    });
  }

  ngOnDestroy() {
    this.destroyed$.complete();
  }

}
