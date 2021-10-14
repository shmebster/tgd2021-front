import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Participant } from "../../../types/participant";
import { EventService } from "../../services/event.service";
import { Observable, Subject, Subscription } from "rxjs";
import { filter, map, takeUntil } from "rxjs/operators";
import { EventCardPlayed, EventCardsChanged, EventPhotosUpdated, ServerEvent } from "../../../types/server-event";
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
    this.eventService.photosUpdatedEvent.pipe(
        takeUntil(this.destroyed$),
        map((e) => e.data),
        filter((e) => e.id === this.participant.telegramId),
    ).subscribe((e) => {
      this.imgTimestamp = (new Date()).getTime();
    });
    this.eventService.cardChangedEvent.pipe(
        takeUntil(this.destroyed$),
        map(e => e.data),
        filter(e => e.telegramId === this.participant.telegramId),
    ).subscribe((e) => {
      this.getCards()
    });
    this.eventService.cardPlayedEvent.pipe(
        takeUntil(this.destroyed$),
        map(e => e.data),
        filter(e => e.telegramId === this.participant.telegramId),
    ).subscribe(e => {
      this.getCards();
    });
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
