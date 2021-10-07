import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from "./views/quiz/quiz.component";
import { HomeComponent } from "./views/home/home.component";

const routes: Routes = [
  { path: 'quiz', component: QuizComponent },
  { path: 'welcome', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
