import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { API_URL } from "../../app.constants";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VoiceService {

  constructor(private httpClient: HttpClient) { }
  public voiceSubject = new Subject<string>();
  public audioEndedSubject = new Subject<void>();

  playAudio(url: string) {
    console.log(`play audio ${url}`);
    this.voiceSubject.next(url);
  }

  getAudioUrl(text: string) {
    return `${API_URL}/voice/tts?text=${text}`
  }

  getAudioUrlSSML(text: string) {
    return `${API_URL}/voice/ssml?text=${encodeURI(text)}`
  }

  audioEnded() {
    this.audioEndedSubject.next();
  }
}
