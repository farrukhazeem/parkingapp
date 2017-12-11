import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { AuthGuard } from './auth.guard'

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookingComponent } from './booking/booking.component';
import { ViewComponent } from './view/view.component';
import { FeedbackComponent } from './feedback/feedback.component';

import { ErrorpageComponent } from './errorpage/errorpage.component';


import { AuthService } from './shared/auth.service';
import { SlotsComponent } from './slots/slots.component';



const appRoutes: Routes =[
    {
      path:'',
      redirectTo: 'signin',
      pathMatch: 'full',    
    },
    {    
      path: 'dashboard',
      component:DashboardComponent,
      canActivate: [AuthGuard],
    },
      { path: 'booking', component:BookingComponent,
      canActivate: [AuthGuard], },
      { path: 'slots', component:SlotsComponent,
      canActivate: [AuthGuard], },
      { path: 'view', component:ViewComponent,
      canActivate: [AuthGuard], },
      { path: 'feedback', component:FeedbackComponent,
      canActivate: [AuthGuard], },
    {
      path: 'signup',
      component:SignupComponent
    },
    {
      path: 'signin',
      component: SigninComponent
    },
  
  ];


  @NgModule({
    
   
    imports: [
        RouterModule.forRoot(appRoutes) ],

exports: [
    RouterModule
],


})
export class AppRoutesModule{  }