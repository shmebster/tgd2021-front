import { Component, OnInit } from '@angular/core';
import { VoiceService } from "../../services/voice.service";

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {

  constructor(private voiceService: VoiceService) { }

  ngOnInit(): void {
  }

}
