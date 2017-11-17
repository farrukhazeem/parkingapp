import { AuthService } from './../shared/auth.service';
import {Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormGroup,FormControl, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material';
import {Router, RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable} from 'rxjs';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const C_N = /^[0-9]/;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None
})



export class SignupComponent implements OnInit {

  usersRef: AngularFireList<any>;
  users: Observable<any[]>;
  currentUserKey;


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)]);

  contactFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(C_N)]);


 
   username:'' ;
   email:'' ;
   password:'' ;
   address:'' ; 
   contact:'' ; 
 
  constructor( private fb: FormBuilder, private router: Router,private db: AngularFireDatabase, public authService: AuthService ) {
    this.usersRef = db.list('/users');
    this.users = this.usersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    })

  
  }

  ngOnInit() {
  }

  signup():void {
    this.authService.emailSignUp(this.email,this.password,this.username,this.address, this.contact).then((data) => {
      this.email = '';
      this.password = '';
      this.username = '';
      this.address = '';
      this.contact = ''; 
  })



  }



}
