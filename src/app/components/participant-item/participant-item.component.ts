import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Participant } from "../../../types/participant";
import { EventService } from "../../services/event.service";
import { Observable, Subject, Subscription } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { EventCardsChanged, EventPhotosUpdatedData, ServerEvent } from "../../../types/server-event";
import { API_URL } from "../../../app.constants";
import { ApiService } from "../../services/api.service";
import { CardItem } from "../../../types/card-item";

@Component({
  selector: 'app-participant-item',
  templateUrl: './participant-item.component.html',
  styleUrls: ['./participant-item.component.scss']
})
export class ParticipantItemComponent implements OnInit, OnDestroy {
  @Input() participant: Participant;
  @Input() small = false;
  cards: CardItem[] = [];
  private destroyed$ = new Subject<void>();
  imgTimestamp = (new Date()).getTime();
  constructor(private eventService: EventService, private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.eventService.eventEmitter.pipe(
      takeUntil(this.destroyed$),
      filter(e => e.event === 'photos_updated' && (e.data as EventPhotosUpdatedData).id === this.participant.telegramId)
    ).subscribe((e) => {
      this.imgTimestamp = (new Date()).getTime();
    })
    this.eventService.eventEmitter.pipe(
        takeUntil(this.destroyed$),
        filter(e => e.event === 'cards_changed' && (e.data as EventCardsChanged).telegramId === this.participant.telegramId)
    ).subscribe((e) => {
      this.getCards()
    })
    this.getCards();
  }
  ngOnDestroy() {
    this.destroyed$.complete();
  }

  getCards() {
    this.apiService.getCards(this.participant.telegramId).subscribe((r) => {
      this.cards = r;
    })
  }


  getImageUrl() {
    return `${API_URL}/guests/photo/${this.participant.telegramId}?$t=${this.imgTimestamp}`;
  }
}
