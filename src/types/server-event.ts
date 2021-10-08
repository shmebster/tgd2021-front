import { Question } from "./question";

export interface EventPhotosUpdatedData {
  id: number;
}

export interface EventStateChanged {
  state: string;
  value: string;
}
export interface EventAnswerReceived {
  telegramId: number;
}

export interface QuestionChangedData extends Question {};

export interface ServerEvent {
  event: 'photos_updated' | 'state_changed' | 'question_changed' | 'answer_received',
  data: EventPhotosUpdatedData | EventStateChanged | QuestionChangedData | EventAnswerReceived;
}
