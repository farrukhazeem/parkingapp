import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormControl, FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthGuard } from './../auth.guard';
import { AuthService } from './../shared/auth.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FeedbackComponent implements OnInit {
  
  
    comment: '';

  myGroup2: FormGroup;
  usersRef: AngularFireList<any>;
  users: Observable<any[]>;
  feedbacks: Observable<any[]>;
  feedbacksRef: AngularFireList<any>;

  
  applyF ={key:'', comment:'',username:'',email:''};

  constructor(private sb2: FormBuilder,private router: Router,public authService: AuthService, private af: AngularFireAuth,
    private db: AngularFireDatabase) { 
  


        


    }

  ngOnInit() {
  }

 
  
}
