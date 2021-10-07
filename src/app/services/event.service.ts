import { Injectable, EventEmitter } from '@angular/core';
import { ServerEvent } from "../../types/server-event";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public eventEmitter = new EventEmitter<ServerEvent>();
  constructor() { }

  public emit(event: ServerEvent) {
    console.log(`event`, event);
    this.eventEmitter.emit(event);
  }
}
