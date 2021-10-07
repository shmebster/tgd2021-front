import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URL } from "../../app.constants";
import { AppState } from "../../types/app-state";
import { Participant } from "../../types/participant";
import { Question } from "../../types/question";

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

  public getQuestion(): Observable<Question> {
    return this.httpClient.get<Question>(`${API_URL}/quiz`);
  }
}
