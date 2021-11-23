import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() id: number;
  public img: string;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.img = this.apiService.getImageUrl(this.id);
  }


}
