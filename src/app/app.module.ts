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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
