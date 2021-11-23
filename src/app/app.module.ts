import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { QuizComponent } from './views/quiz/quiz.component';
import { HomeComponent } from './views/home/home.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { ParticipantItemComponent } from './components/participant-item/participant-item.component';
import { QuestionComponent } from './components/question/question.component';
import { FadeinDirective } from './directives/fadein.directive';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RegisterComponent } from './views/register/register.component';
import { AnswerNotificationComponent } from './components/answer-notification/answer-notification.component';
import { OnboardingComponent } from './views/onboarding/onboarding.component';
import { CardPlayedComponent } from './components/card-played/card-played.component';
import { GameQueueComponent } from './components/game-queue/game-queue.component';
import { GamePauseComponent } from './components/game-pause/game-pause.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './components/toast/toast.component';
import { EventService } from "./services/event.service";
import { ApiService } from "./services/api.service";
import { CountdownComponent } from './components/countdown/countdown.component';
import { CardsHistoryComponent } from './components/cards-history/cards-history.component';
import { AvatarComponent } from './components/avatar/avatar.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    HomeComponent,
    ParticipantsComponent,
    ParticipantItemComponent,
    QuestionComponent,
    FadeinDirective,
    RegisterComponent,
    AnswerNotificationComponent,
    OnboardingComponent,
    CardPlayedComponent,
    GameQueueComponent,
    GamePauseComponent,
    ToastComponent,
    CountdownComponent,
    CardsHistoryComponent,
    AvatarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [EventService, ApiService],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
