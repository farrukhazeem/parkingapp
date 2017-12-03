import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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



const appRoutes: Routes =[
    {
      path:'',
      redirectTo: '',
      pathMatch: 'full',    
      component:SigninComponent
    },
    {    
      path: 'dashboard',
      component:DashboardComponent},  
      { path: 'booking', component:BookingComponent },
      { path: 'view', component:ViewComponent },
      { path: 'feedback', component:FeedbackComponent },
      

   {    
     path: '**',
    component:ErrorpageComponent
  },
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