import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AdminRoutingModule } from "./admin-routing.module";
import { MainActionsComponent } from './components/main-actions/main-actions.component';
import { AppModule } from "../app.module";
import { SharedModule } from "../shared/shared.module";



@NgModule({
  declarations: [
    HomeComponent,
    MainActionsComponent
  ],
  imports: [
    CommonModule, AdminRoutingModule, SharedModule,
  ]
})
export class AdminModule { }
