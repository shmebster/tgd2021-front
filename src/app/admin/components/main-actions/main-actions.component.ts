import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { AppState } from "../../../../types/app-state";
import { EventService } from "../../../services/event.service";
import { merge } from "rxjs";

class GamePage {
  title: string;
  name: string
}

@Component({
  selector: 'app-main-actions',
  templateUrl: './main-actions.component.html',
  styleUrls: ['./main-actions.component.scss']
})
export class MainActionsComponent implements OnInit {
  state: AppState;
  loading: Boolean;
  quizState: 'running' | 'paused';

  pages: GamePage[] = [
    { title: 'Welcome', name: 'welcome' },
    { title: 'Registration', name: 'register'},
    { title: 'Onboarding', name: 'onboarding' },
    { title: 'Start quiz', name: 'quiz' }
  ];

  constructor(private apiService: ApiService, private eventService: EventService) { }

  private updateState() {
    this.loading = true;
    this.apiService.getAppState('main').subscribe((r) => {
      this.state = r;
      this.loading = false;
    })
    this.apiService.getGameState().subscribe(r => {
      console.log(r);
      this.quizState = r.value;
    })
  }

  ngOnInit(): void {
    this.updateState();
    merge(
        this.eventService.gameResumed,
        this.eventService.gamePaused,
    ).subscribe(e => {
      this.updateState();
    })
  }

  isActive(state: string) {
    if(this.state.value === state) {
      return true;
    }
    return false;
  }

  setState(state: string) {
    this.apiService.setAppState('main', state).subscribe(() => {
      this.updateState();
    });
  }

  pauseGame() {
    this.apiService.pauseGame().subscribe(() => {
      console.log(`game paused`);
    });
  }

  resumeGame() {
    this.apiService.resumeGame().subscribe(() => {
      console.log(`game resumed`);
    })
  }
}
