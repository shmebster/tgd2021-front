import { Component, OnInit } from '@angular/core';
import { EventService } from "../../services/event.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: 'app-cards-history',
  templateUrl: './cards-history.component.html',
  styleUrls: ['./cards-history.component.scss']
})
export class CardsHistoryComponent implements OnInit {
  private destroyed$ = new Subject<null>();
  public cardsHistory = [{
    telegramId: 2116542874,
    card: 'ShitCard',
  }];
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.cardPlayedEvent.pipe(takeUntil(this.destroyed$)).subscribe((event) => {

    });
    setInterval(() => {
      this.cardsHistory.push({
        telegramId: 2116542874,
        card: 'ShitCard',
      })
    }, 10000)
  }

}
