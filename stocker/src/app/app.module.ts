import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './home/home.module';
import { BillService } from './service/bill.service';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireModule} from 'angularfire2';
import {environment } from '../environments/environment'
import { RouterModule} from '@angular/router';
import{BillModule } from './Billing/bill/bill.module'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HomeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule,
    BillModule,
    RouterModule.forRoot([
      {
        path:'',
        component:BillModule
      }
    ])
  ],
  providers: [BillService],
  bootstrap: [AppComponent]
})
export class AppModule { }
