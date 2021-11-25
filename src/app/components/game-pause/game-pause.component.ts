import { Component, OnDestroy, OnInit } from '@angular/core';
import { VoiceService } from "../../services/voice.service";
import { getAudioPath } from "../../helper/tts.helper";

@Component({
  selector: 'app-game-pause',
  templateUrl: './game-pause.component.html',
  styleUrls: ['./game-pause.component.scss']
})
export class GamePauseComponent implements OnInit, OnDestroy {
  tstamp = new Date().getTime();
  private interval: number;

  constructor(private voiceService: VoiceService) { }

  ngOnInit(): void {
    this.interval = setInterval(() => this.tstamp = new Date().getTime(), 13000);
    this.voiceService.playAudio(getAudioPath('Так, стоп-игра. Охлаждаем траханье'));
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }

}
