import { AuthService } from './../shared/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';


import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {


  constructor( private router: Router ) {

  
 
    
   

    
  }

  ngOnInit() {
  }



}
