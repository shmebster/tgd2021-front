import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { getAudioPath } from 'src/app/helper/tts.helper';
import { VoiceService } from 'src/app/services/voice.service';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ opacity: 0, backgroundColor: 'inherit' }),
          animate('2500ms', style({ opacity: 1, backgroundColor: 'black' }))
        ]),
        transition(':leave', [
          style({backgroundColor: 'black', opacity: 1}),
          animate('2500ms', style({backgroundColor: 'inherit', opacity: 0}))
        ])
      ]
    )
  ],
})
export class FinishComponent implements OnInit {
  public step = 1;
  constructor(private voiceService: VoiceService) { }

  ngOnInit(): void {
  }

  gameCompletedVideoEnded() {
    this.step = 2;
  }
  
  congratulate() {
    setTimeout(() => {
      this.voiceService.playAudio(getAudioPath("Поздравляю победителей, и сочувствую побежденным"));
    }, 1700);
    setTimeout(() => {
      this.step = 3;
    }, 30000);

  }

}
