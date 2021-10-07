import { Question } from "./question";

export interface EventPhotosUpdatedData {
  id: number;
}

export interface EventStateChanged {
  state: string;
  value: string;
}

export interface QuestionChangedData extends Question {};

export interface ServerEvent {
  event: 'photos_updated' | 'state_changed' | 'question_changed',
  data: EventPhotosUpdatedData | EventStateChanged | QuestionChangedData;
}
