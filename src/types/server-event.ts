import { Question } from "./question";

export interface EventPhotosUpdated {
  id: number;
}

export interface EventStateChanged {
  state: string;
  value: string;
}
export interface EventAnswerReceived {
  telegramId: number;
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
  data: T
}
