import { Injectable, EventEmitter } from '@angular/core';
import {
  EventAnswerReceived,
  EventCardPlayed,
  EventCardsChanged,
  EventPhotosUpdated, EventStateChanged, EventUserAdded, EventWrongAnswerReceived, QuestionChangedEvent,
  ServerEvent
} from "../../types/server-event";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public answerReceivedEvent = new EventEmitter<ServerEvent<EventAnswerReceived>>();
  public cardPlayedEvent = new EventEmitter<ServerEvent<EventCardPlayed>>();
  public cardChangedEvent = new EventEmitter<ServerEvent<EventCardsChanged>>();
  public photosUpdatedEvent = new EventEmitter<ServerEvent<EventPhotosUpdated>>();
  public questionChangedEvent = new EventEmitter<ServerEvent<QuestionChangedEvent>>();
  public stateChangedEvent = new EventEmitter<ServerEvent<EventStateChanged>>();
  public userAddedEvent = new EventEmitter<ServerEvent<EventUserAdded>>();
  public wrongAnswerEvent = new EventEmitter<ServerEvent<EventWrongAnswerReceived>>();
  constructor() { }

  public emit(event: ServerEvent<any>) {
    console.log(`event`, event);
    switch (event.event) {
      case "answer_received":
        this.answerReceivedEvent.emit(event as ServerEvent<EventAnswerReceived>);
        break;
      case "card_played":
        this.cardPlayedEvent.emit(event as ServerEvent<EventCardPlayed>);
        break;
      case "cards_changed":
        this.cardChangedEvent.emit(event as ServerEvent<EventCardsChanged>);
        break;
      case "photos_updated":
        this.photosUpdatedEvent.emit(event as ServerEvent<EventPhotosUpdated>);
        break;
      case "question_changed":
        this.questionChangedEvent.emit(event as ServerEvent<QuestionChangedEvent>);
        break;
      case "state_changed":
        this.stateChangedEvent.emit(event as ServerEvent<EventStateChanged>);
        break;
      case "user_added":
        this.userAddedEvent.emit(event as ServerEvent<EventUserAdded>);
        break;
      case "wrong_answer_received":
        this.wrongAnswerEvent.emit(event as ServerEvent<EventWrongAnswerReceived>);
        break;
    }
  }
}
