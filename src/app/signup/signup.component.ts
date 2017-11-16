import { AuthService } from './../shared/auth.service';
import {Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {FormControl, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material';
import { Router, RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const P_W = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]/;
const C_N = /^[0-9]/;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None
})



export class SignupComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)]);

  contactFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(P_W)]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(C_N)]);

 model ={
   name:'',
   email:'',
   password:'',
   address:'',
   contact:''
 }
  constructor( private router: Router ) {

  
 
    
   

    
  }

  ngOnInit() {
  }



}
