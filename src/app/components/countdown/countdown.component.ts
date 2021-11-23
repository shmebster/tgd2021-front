import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { interval } from "rxjs";
import { take } from "rxjs/operators";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  animations: [
    trigger('counter', [
      transition('* => *', [
        style( {
          opacity: 0,
          bottom: '-100%',
        }),
        animate('0.3s', style( {
          opacity: 0.9,
          bottom: '0',
        }))
      ]),
    ])
  ]
})
export class CountdownComponent implements OnInit {
  @Input() countdown: number;
  @Output() completed: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
    this.beginCountdown(this.countdown).subscribe({
      next: (i) => {
        this.countdown--;
      },
      complete: () => {
        this.completed.emit();
      }
    });
  }

  beginCountdown(count: number) {
    return interval(1000).pipe(take(count + 1 ));
  }

}
