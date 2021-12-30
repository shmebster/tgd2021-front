import { Component, OnInit } from '@angular/core';
import { VoiceService } from "../../services/voice.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private voiceService: VoiceService) { }

  ngOnInit(): void {
    setTimeout(() => this.playWelcome(), 3000);
  }

  playWelcome() {
    const url = this.voiceService.getAudioUrlSSML(`<speak>
  Всем привет, товарищи!<break time="1s"/> 
  Я снова рада приветствовать вас в игре! Для тех, кто еще не играл - представлюсь, я Шалиса - это как Алиса, только шальная. Саша, привет!
  <break time="1s"/>та-дам!
  Возможно, вы меня уже слышали из навигаторов таксистов, но это так <break time="1s" />профессия для души, а тут мое основное место работы.
  <break time="2s" />Во всяком случае на этот вечер.
  <break time="1s" />
  Настало время зарегистрироваться <break time="1s" />
  Доставай свой телефон <break time="1s" />(нууу<break time="1s" /> и, я надеюсь у тебя все еще есть телеграм?<break time="2s" />
  Достал?<break time="1s" />
  Тогда сканируй кью ар код и проходи простую регистрацию, надеюсь, ты не отупел со дня Благодарения? ха-ха<break time="1s"/>
  Я не знаю, что за вопросы будут в этот раз, потому что Кирилл и Оксана заказали их на аутсорсе, зато мы играем все вместе. Надеюсь, мы не обосремся, кек.<break time="1s" /> да начнеться мясо<break time="1s" />
  Про правила я расскажу чуть позже, шаг по шагу давай.
  <break time="2s" />
  А кто набирает меньше всех баллов - тот выигрывает бесплатную путевку в ковидарий имени Шараловых. Ха-ха.
</speak>`);

    this.voiceService.playAudio(url)
  }

}
