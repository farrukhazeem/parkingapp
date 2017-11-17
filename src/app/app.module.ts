import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {FormControl, Validators} from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFireDatabaseModule,AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './shared/auth.service';


import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatIconModule} from '@angular/material';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material';
import {MatButtonModule, 
  MatCheckboxModule,
  MatToolbarModule
} from '@angular/material';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookingComponent } from './booking/booking.component';
import { ViewComponent } from './view/view.component';
import { FeedbackComponent } from './feedback/feedback.component';

export const firebaseConfig = {
  apiKey: "AIzaSyC41euZD-F2JOJ1mtRlHahuNfuRyGMROpc",
  authDomain: "parkingapp-28b47.firebaseapp.com",
  databaseURL: "https://parkingapp-28b47.firebaseio.com",
  projectId: "parkingapp-28b47",
  storageBucket: "",
  messagingSenderId: "669551910377"

};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SigninComponent,
    SignupComponent,
    DashboardComponent,
    BookingComponent,
    ViewComponent,
    FeedbackComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    HttpModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule, 
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterModule,
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
    component:SigninComponent
      },
    
      {
        path: 'signup',
        component:SignupComponent
      },
      {
        path: 'dashboard',
        component:DashboardComponent
      }


  ]),
  
  AngularFireModule.initializeApp(firebaseConfig)
 ] ,

  providers: [AuthService,AngularFireDatabase, AuthService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
