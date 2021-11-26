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
  Позвольте представиться, меня зовут Шалиса (это как Алиса, только шальная), и сегодня я буду вести эту игру.
  <break time="1s"/>та-дам!
  Возможно, вы меня уже слышали из навигаторов таксистов, но это так <break time="1s" />профессия для души, а тут мое основное место работы.
  <break time="2s" />Во всяком случае на этот вечер.
  <break time="1s" />
  Настало время зарегистрироваться <break time="1s" />
  Достовай свой телефон <break time="1s" />(нууу<break time="1s" /> и я надеюсь у тебя есть телеграм?<break time="1s" /><break time="5s" />
  Достал?<break time="1s" />
  Тогда сканируй кью ар код с индюшкой, и проходи простую регистрацию, надеюсь твоих мозгов на это хватит? ха-ха<break time="1s"/>
  Потому что впереди ждут каверзные вопросы, <break time="1s" /> да начнеться мясо<break time="3s" />
  Даа<break time="1s"/>, кстаати<break time="1s"/>. Про правила я расскажу чуть позже, шаг по шагу давай
  <break time="2s" />
  И кстати, большое всем спасибо что вы приехали. Я приложу все усилия, чтобы этот вечер был леген<break time="1s"/> подожди-подожди<break time="2s"/>дарным,
  легендарным, ну вы поняли. 
</speak>`);

    this.voiceService.playAudio(url)
  }

}
