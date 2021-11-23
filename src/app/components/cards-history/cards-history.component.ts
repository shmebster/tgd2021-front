import { Component, OnInit } from '@angular/core';
import { EventService } from "../../services/event.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

class CardHistory {
  telegramId: number;
  card: string;
}

@Component({
  selector: 'app-cards-history',
  templateUrl: './cards-history.component.html',
  styleUrls: ['./cards-history.component.scss']
})
export class CardsHistoryComponent implements OnInit {
  private destroyed$ = new Subject<null>();
  public cardsHistory: CardHistory[] = [];
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.cardPlayedEvent.pipe(takeUntil(this.destroyed$)).subscribe((event) => {
      this.cardsHistory.push({ telegramId: event.data.telegramId, card: event.data.name });
    });
  }

}
