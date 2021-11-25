import { Question } from "./question";

export enum QueueTypes {
  additionalQuestion = 'additional_question',
  giveOutAPrize = 'give_out_a_prize',
  penalty = 'penalty',
}

export interface EventPhotosUpdated {
  id: number;
}

export interface EventStateChanged {
  state: string;
  value: string;
}
export interface EventAnswerReceived {
  telegramId: number;
  validAnswer: string;
}

export interface EventWrongAnswerReceived extends EventAnswerReceived {}

export interface EventUserAdded {
  telegramId: number;
  name: string;
}

export interface EventCardsChanged {
  telegramId: number;
  cards: [];
}
export interface EventCardPlayed {
  telegramId: number;
  card: string;
  name: string;
}

export interface EventScoreChanged {
  telegramId: number;
  newScore: number;
}

export interface EventGameQueue {
  target: number;
  completed: boolean;
  type: QueueTypes;
  _id: string;
}

export interface EventQueueCompleted {

}

export class EventNotification {
  text: string;
  timeout: number;
}


export interface QuestionChangedEvent extends Question {};

export interface ServerEvent<T> {
  event: 'photos_updated'
      | 'state_changed'
      | 'question_changed'
      | 'answer_received'
      | 'user_added'
      | 'cards_changed'
      | 'card_played'
      | 'wrong_answer_received'
      | 'score_changed'
      | 'game_queue'
      | 'queue_completed'
      | 'game_paused'
      | 'game_resumed'
      | 'notification'
  data: T
}
