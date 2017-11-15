import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {FormControl, Validators} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SigninComponent implements OnInit {
 
  constructor(private router: Router) {


    
   }

  ngOnInit() {
  }

}
