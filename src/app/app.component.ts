import { Component, OnInit } from '@angular/core';
import { io, Socket } from "socket.io-client";
import { API_URL } from "../app.constants";
import { EventService } from "./services/event.service";
import { EventStateChanged, ServerEvent } from "../types/server-event";
import { ApiService } from "./services/api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, map } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'thanksgiving';
  connection = io(API_URL);

  constructor(private eventService: EventService, private apiService: ApiService,private router: Router, private routeSnapshot: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.connection.on('events', (data: ServerEvent) => {
      this.eventService.emit(data);
    });
    this.apiService.getAppState('main').subscribe((result) => {
      this.router.navigate([`/${result.value}`]).then(() => {
        console.log(`navigated to ${result.value}`);
      })
    });
    this.eventService.eventEmitter.pipe(
      filter(e => e.event === 'state_changed'),
      map(e => e.data as EventStateChanged)
    ).subscribe(result => {
      this.router.navigate([`${result.value}`])
    })
  }
}
