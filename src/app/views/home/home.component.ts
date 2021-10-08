import { Component, OnDestroy, OnInit } from '@angular/core';
import { welcomeDict } from "../../../dicts/welcome.dicts";
import { animate, keyframes, state, style, transition, trigger } from "@angular/animations";

class RulesItem {
  id: number;
  title: string;
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInAnimation', [
      transition('void => *', []),   // when the item is created
      transition('* => void', []),   // when the item is removed
      transition('* => *', [         // when the item is changed
        animate(1200, keyframes([  // animate for 1200 ms
          style ({ opacity: 0.0}),
          style ({ opacity: 1.0 }),
        ])),
      ]),
    ])]
})
export class HomeComponent implements OnInit, OnDestroy {
  rules: RulesItem[] = [
    { id: 1, title: '🎉 Веселись' , text: 'Мы надеемся, что у тебя есть день на опохмел, поэтому не стесняйся пить' },
    { id: 2, title: '🧑‍💻 Тебя ждет необычный квиз', text: 'Расчехляй свой Телеграмм и познакомься с Ботом Благодарения'},
    { id: 3, title: '😊 Не обижайся', text: 'Вопросы могут быть разные и наказания тоже, помни, что у нас нет злого умысла' },
    { id: 4, title: '🧠 Соберись', text: 'Призы ждут самых быстрых и умных'},
    { id: 5, title: '👀 Читай и запоминай', text: 'Мы расскажем все правила квиза, они несложные, пожалуйста, прочитай их'},
    { id: 6, title: '🥳 Не стесняйся играть', text: 'У нас точно найдется парочка вопросов, на которые ты ответишь и получишь приз'},
    { id: 7, title: '💬 Но главное помни', text: 'Что ты пидор, но мы все равно тебя любим' }
  ]
  welcomeDict = welcomeDict;
  currentRule = 0;
  currentWelcomeText = 0;
  private interval: number;
  private welcomeInterval: number;
  constructor() { }

  ngOnInit(): void {
    this.interval = setInterval(() => {
      if (this.currentRule < this.rules.length - 1) {
        this.currentRule++;
      } else {
        this.currentRule = 0;
      }
    }, 10000);
    this.welcomeInterval = setInterval(() => {
      this.setNewWelcomeWord()
    }, 2300);
  }

  setNewWelcomeWord() {

    if (this.currentWelcomeText < this.welcomeDict.length) {
      this.currentWelcomeText++;
    } else {
      this.currentWelcomeText = 0;
    }
  }
  ngOnDestroy() {
    clearInterval(this.interval);
    clearInterval(this.welcomeInterval);
  }


}
