import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { getAudioPath } from 'src/app/helper/tts.helper';
import { VoiceService } from "../../services/voice.service";


interface RuleItem {
  text: string;
  action?: () => void;
}

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
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
export class OnboardingComponent implements OnInit, OnDestroy {
  @ViewChild('avoidPenaltyCard') private avoidPenaltyCardEl: ElementRef;
  @ViewChild('stolePrizeCard') private stolePrizeCardEl: ElementRef;
  @ViewChild('shitCard') private shitCardEl: ElementRef;
  @ViewChild('luckyCard') private luckyCardEl: ElementRef;
  @ViewChild('doubleTreasureCard') private doubleTreasureCardEl: ElementRef;
  private rules: RuleItem[] = [
    { text: 'Игра состоит из вопросов с четырьмя вариантами ответов, правильный - только один.'},
    { text: 'Вопросы и ответы будут отображаться на экране и в Боте Благодарения.' },
    { text: 'Каждый игрок в начале игры имеет на руках 4 карты, набор карт определяется случайно. Описание карт ты найдешь ниже. После использования карты ты получаешь новую случайную карту.' },
    { text: 'На разыгрывание карты время ограничено, примерно 10 секунд.' },
    { text: 'Задача игрока - ответить правильно и быстрее других.' },
    { text: 'Первый игрок, ответивший правильно, получает одно очко и шанс выиграть приз.' },
    { text: 'Первый игрок, ответивший неправильно, получает наказание.' },
    { text: 'Избежать наказание можно только с помощью соотвествуещей карты, данную карту ты можешь сыграть перед озвучиванием наказания', action: () => {
      this.shakeCard(this.avoidPenaltyCardEl);
    }},
    { text: 'Карту украсть приз ты можешь сыграть в момент когда кто-то собирается получить награду, но до момента того как ты узнаешь что это именно за приз', action: () => {
      this.shakeCard(this.stolePrizeCardEl);
    }},
    { text: 'Говно-карту ты можешь разыграть в момент когда кто-то ответил правильно, тем самым ты заставишь именно этого игрока ответить на один дополнительный вопрос. На одного игрока можно сыграть неограниченное количество этих карт', action: () => {
      this.shakeCard(this.shitCardEl);
    }},
    { text: 'Лаки карту ты сможешь сыграть после своего правильного ответа, она увеличит твои шансы на получение приза', action: () => {
      this.shakeCard(this.luckyCardEl);
    }},
    {
      text: 'Ну и самая редкая карта - карта удвоения приза, играй ее перед тем как получить награду, и вместо одной награды ты получишь две!',
      action: () => {
        this.shakeCard(this.doubleTreasureCardEl);
      }
    },
    { text: 'Не торопись с ответами, игра идет до той поры пока мы не разыграем все призы' },
  ];
  public currentRule: string;
  private currentRulePosition = 0;
  private allRulesAnnounced = false;
  private destroyed$ = new Subject<void>();
  private voiceSubscription: Subscription;

  constructor(private voiceService: VoiceService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.voiceService.playAudio(getAudioPath('Итак друзья, перейдем к правилам'));
    setTimeout(() => {
      this.beginRuleSwitching();
    }, 3500);
  }
  ngOnDestroy(): void {
    this.destroyed$.complete();
    this.voiceSubscription.unsubscribe();
  }

  shakeCard(card: ElementRef) {
    console.log(`shake card`);
    console.log(card.nativeElement);
    this.renderer.addClass(card.nativeElement, 'shake');
    this.renderer.addClass(card.nativeElement, 'zoom-in');
    this.voiceService.audioEndedSubject.pipe(take(1)).subscribe(() => {
      this.renderer.addClass(card.nativeElement, 'zoom-out');
      setTimeout(() => { 
        this.renderer.removeClass(card.nativeElement, 'zoom-out');
        this.renderer.removeClass(card.nativeElement, 'zoom-in');
      }, 3000);
      this.stopShaking(card);
    })
  }
  stopShaking(card: ElementRef) {
    console.log(`stop shacking`);
    this.renderer.removeClass(card.nativeElement, 'shake');
  }

  private handleRule(rule: RuleItem) {
    this.currentRule = rule.text;
    if (!this.allRulesAnnounced) {
      this.voiceService.playAudio(getAudioPath(this.currentRule));
    }
    if (rule.action) {
      rule.action();
    }
  }

  private playNextRule() {
    this.currentRulePosition++;
      if (this.currentRulePosition >= this.rules.length) {
        this.allRulesAnnounced = true;
        this.voiceService.playAudio(getAudioPath('Это все правила, надеюсь все понятно. А если нет, сейчас Кирилл и Оксана вам все пояснят, ну и совсем для тупых - пустила по кругу правила на экране, а если ты не сможешь правила понять - то по кругу пущу тебя, читать по второму кругу правила не буду, потому что Кириллу за каждое слово и так платить.'))
        setInterval(() => this.currentRulePosition = 0, 5000);
      }
      this.handleRule(this.rules[this.currentRulePosition]);
  }

  private beginRuleSwitching() {
    this.handleRule(this.rules[this.currentRulePosition]);
    this.voiceSubscription = this.voiceService.audioEndedSubject.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      setTimeout(() => this.playNextRule(), 500);
    })
   
  }

}
