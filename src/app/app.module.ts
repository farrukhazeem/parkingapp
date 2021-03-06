import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {FormControl, Validators} from '@angular/forms';
import { AuthGuard } from './auth.guard'
import { AngularFireAuth } from 'angularfire2/auth';
import { BookingServiceService } from './booking-service.service';

import { AngularFireDatabaseModule,AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './shared/auth.service';

import {MatDialogModule} from '@angular/material/dialog';

import { AngularFireModule } from 'angularfire2';


import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatIconModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';
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

import {MatMenuModule , MatNativeDateModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';

import { AppRoutesModule } from './app.routes';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { SlotsComponent } from './slots/slots.component';



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
    ErrorpageComponent,
    SlotsComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    HttpModule,
    
    MatCardModule,
    MatSidenavModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule, 
    CommonModule,
    FormsModule,
    MatMenuModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatDatepickerModule,
    RouterModule,
    AppRoutesModule,
    MatNativeDateModule,
  
  
  AngularFireModule.initializeApp(firebaseConfig)
 ] ,

  providers: [ AuthGuard,AuthService,AngularFireDatabase, AngularFireAuth,
    BookingServiceService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
