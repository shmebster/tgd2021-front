import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { AppState } from "../../../../types/app-state";

@Component({
  selector: 'app-main-actions',
  templateUrl: './main-actions.component.html',
  styleUrls: ['./main-actions.component.scss']
})
export class MainActionsComponent implements OnInit {
  state: AppState;
  loading: Boolean;


  constructor(private apiService: ApiService) { }

  private updateState() {
    this.loading = true;
    this.apiService.getAppState('main').subscribe((r) => {
      this.state = r;
      this.loading = false;
    })
  }

  ngOnInit(): void {
    this.updateState();
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
}
