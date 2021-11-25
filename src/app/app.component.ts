import { Component, OnDestroy, OnInit } from '@angular/core';
import { io, Socket } from "socket.io-client";
import { API_URL } from "../app.constants";
import { EventService } from "./services/event.service";
import { EventStateChanged, ServerEvent } from "../types/server-event";
import { ApiService } from "./services/api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, map, takeUntil } from "rxjs/operators";
import { ToastService } from "./toast.service";
import { VoiceService } from "./services/voice.service";
import { Subject } from "rxjs";
import { getAudioPath } from "./helper/tts.helper";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'thanksgiving';
  connection = io(API_URL);
  destroyed = new Subject<void>();
  audioSrc: string;

  constructor(
      private eventService: EventService,
      private apiService: ApiService,
      private router: Router,
      private toastService: ToastService,
      private voiceService: VoiceService,
      private routeSnapshot: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.connection.on('events', (data: ServerEvent<any>) => {
      this.eventService.emit(data);
    });
    this.apiService.getAppState('main').subscribe((result) => {
      this.router.navigate([`/${result.value}`]).then(() => {
        console.log(`navigated to ${result.value}`);
      })
    });
    this.eventService.stateChangedEvent.pipe(
        map(e => e.data),
    ).subscribe(result => {
      this.router.navigate([`${result.value}`])
    })
    this.eventService.notificationEvent.subscribe((event) => {
      this.toastService.showToast(event.data.text, event.data.timeout);
    });
    this.voiceService.voiceSubject.pipe(takeUntil(this.destroyed)).subscribe((text) => {
      this.audioSrc = text;
    })
  }
  ngOnDestroy() {
    this.destroyed.complete();
  }
}
