import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AdminRoutingModule } from "./admin-routing.module";
import { MainActionsComponent } from './components/main-actions/main-actions.component';
import { AppModule } from "../app.module";
import { SharedModule } from "../shared/shared.module";
import { QueueActionsComponent } from './components/queue-actions/queue-actions.component';



@NgModule({
  declarations: [
    HomeComponent,
    MainActionsComponent,
    QueueActionsComponent
  ],
  imports: [
    CommonModule, AdminRoutingModule, SharedModule,
  ]
})
export class AdminModule { }
