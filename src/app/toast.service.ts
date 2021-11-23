import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }
  public isShown = false;
  public text = '';

  public showToast(msgText: string, timeout: number) {
    this.text = msgText;
    this.isShown = true;
    setTimeout(() => this.isShown = false, timeout);
  }
}
