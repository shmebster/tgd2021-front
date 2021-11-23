import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URL } from "../../app.constants";
import { AppState } from "../../types/app-state";
import { Participant } from "../../types/participant";
import { Question } from "../../types/question";
import { CardItem } from "../../types/card-item";
import { GameState } from "./gameState";
import { PenaltyDto } from "../../types/penalty.dto";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getAppState(state: string): Observable<AppState> {
    return this.httpClient.get<AppState>(`${API_URL}/state/${state}`);
  }

  public getParticipants(): Observable<Participant[]> {
    return this.httpClient.get<Participant[]>(`${API_URL}/guests`);
  }

  public getParticipant(id: number): Observable<Participant> {
    return this.httpClient.get<Participant>(`${API_URL}/guests/${id}`);
  }

  public getQuestion(): Observable<Question> {
    return this.httpClient.get<Question>(`${API_URL}/quiz`);
  }

  public setAppState(state: string, value: string) {
        return this.httpClient.post<AppState>(`${API_URL}/state`, {
          state,
          value
        });
    }

    getCards(telegramId: number): Observable<CardItem[]> {
        return this.httpClient.get<CardItem[]>(`${API_URL}/cards/${telegramId}`);
    }

  continueGame() {
    console.log(`continue game`);
    return this.httpClient.post(`${API_URL}/quiz/proceed`, {});
  }

  markQueueAsCompleted(_id: string) {
    return this.httpClient.post(`${API_URL}/game/${_id}/complete`, {});
  }

    pauseGame() {
        return this.httpClient.post(`${API_URL}/game/pause`, {});
    }

    resumeGame() {
      return this.httpClient.post(`${API_URL}/game/resume`, {});
    }

  getGameState() {
    return this.httpClient.get<GameState>(`${API_URL}/game/state`);
  }

  getPenalty() {
    console.log(`get penalty`);
    return this.httpClient.get<PenaltyDto>(`${API_URL}/penalty`);
  }

    getAdditionalQuestion(target: number) {
        return this.httpClient.post<Question>(`${API_URL}/quiz/extraquestion`, {
          telegramId: target,
        });
    }

  getImageUrl(id: number) {
    const timestamp = new Date().getTime();
    return `${API_URL}/guests/photo/${id}?$t=${timestamp}}`;
  }
}
