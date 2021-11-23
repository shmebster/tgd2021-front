import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-pause',
  templateUrl: './game-pause.component.html',
  styleUrls: ['./game-pause.component.scss']
})
export class GamePauseComponent implements OnInit, OnDestroy {
  tstamp = new Date().getTime();
  private interval: number;

  constructor() { }

  ngOnInit(): void {
    this.interval = setInterval(() => this.tstamp = new Date().getTime(), 13000);
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }

}
