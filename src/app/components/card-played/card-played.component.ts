import { Component, OnInit } from '@angular/core';
import { EventService } from "../../services/event.service";
import { filter, map } from "rxjs/operators";
import { EventCardPlayed } from "../../../types/server-event";
import { ApiService } from "../../services/api.service";
import { animate, style, transition, trigger } from "@angular/animations";
import { API_URL } from "../../../app.constants";

@Component({
  selector: 'app-card-played',
  templateUrl: './card-played.component.html',
  styleUrls: ['./card-played.component.scss'],
  animations: [
    trigger(
        'inOutAnimation',
        [
          transition(
              ':enter',
              [
                style({ height: 0, opacity: 0 }),
                animate('0.5s ease-out',
                    style({ height: '20%', opacity: 1 }))
              ]
          ),
          transition(
              ':leave',
              [
                style({ height: 300, opacity: 1 }),
                animate('1s ease-in',
                    style({ height: 0, opacity: 0 }))
              ]
          )
        ]
    )
  ]
})
export class CardPlayedComponent implements OnInit {
  isShown = false;
  playerName: string;
  card: string;
  participantId: number;
    private imgTimestamp: number;
  constructor(private eventService: EventService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.eventService.cardPlayedEvent.pipe(map((x => x.data))).subscribe(e => {
      console.log(`card_played`);
      this.card = e.card;
      this.participantId = e.telegramId;
      this.apiService.getParticipant(e.telegramId).subscribe((d) => {
        this.playerName = d.name
        this.isShown = true;
        this.imgTimestamp = (new Date()).getTime();
        setTimeout(() => this.isShown = false, 6000);
      });
    })
  }
  getImageUrl() {
    return `${API_URL}/guests/photo/${this.participantId}?$t=${this.imgTimestamp}`;
  }

}
