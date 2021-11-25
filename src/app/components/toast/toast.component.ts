import { Component, OnInit } from '@angular/core';
import { ToastService } from "../../toast.service";
import { getAudioPath } from "../../helper/tts.helper";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  constructor(public toastService: ToastService) { }

  ngOnInit(): void {
  }

    getAudioSrc(text: string) {
        return getAudioPath(text);
    }
}
