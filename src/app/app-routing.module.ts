import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from "./views/quiz/quiz.component";
import { HomeComponent } from "./views/home/home.component";
import { RegisterComponent } from "./views/register/register.component";
import { OnboardingComponent } from "./views/onboarding/onboarding.component";
import { InitialComponent } from './views/initial/initial.component';
import { FinishComponent } from './views/finish/finish.component';

const routes: Routes = [
  { path: 'quiz', component: QuizComponent },
  { path: 'welcome', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'onboarding', component: OnboardingComponent },
  { path: 'initial', component: InitialComponent },
  { path: 'finish', component: FinishComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
