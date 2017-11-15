import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';

import {MatButtonModule, 
  MatCheckboxModule,
  MatToolbarModule
} from '@angular/material';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

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
    SignupComponent
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
      }

  ]),
  
  AngularFireModule.initializeApp(firebaseConfig)
 ] ,

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
