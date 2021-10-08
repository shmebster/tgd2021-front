import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Participant } from "../../../types/participant";

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {
  @Input() small = false;
  participants: Participant[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getParticipants().subscribe((r) => {
      this.participants = r;
    })
  }

}
