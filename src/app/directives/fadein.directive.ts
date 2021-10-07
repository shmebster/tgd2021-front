import { Directive, HostBinding } from '@angular/core';
import { animate, style, transition, trigger } from "@angular/animations";

@Directive({
  selector: '[appFadein]',
})
export class FadeinDirective {
  @HostBinding('@fadeIn') trigger = '';
  constructor() { }

}
