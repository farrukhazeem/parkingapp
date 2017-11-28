import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './../shared/auth.service';
import {FormBuilder, FormGroup,FormControl, Validators} from '@angular/forms';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable} from 'rxjs';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SigninComponent implements OnInit {
  
  usersRef: AngularFireList<any>;
  users: Observable<any[]>;
  currentUserKey;
  currentUser;


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)]);

    email:'' ;
    password:'' ;

  constructor(private fb: FormBuilder,private router: Router,private db: AngularFireDatabase, public authService: AuthService ) {

    this.usersRef = db.list('/users');
    this.users = this.usersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    })
    



   }

  ngOnInit() {
  }

  getUserData(key) {
    this.usersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    })
    return new Promise((resolve, reject) => {
      this.users.subscribe(users => {
        this.currentUser = users.find((user) => user.key === key);
        resolve(this.currentUser);
      });
    })
  }

  signin(value: any):void {
    this.authService.emailLogin(this.email,this.password).then((data) => {
     
      if (data) {
        const uid = data.uid;
        this.getUserData(uid).then((usd) => {
       
        
        this.router.navigate(['/dashboard']);

      });
    }
    

  })
  .catch(error => console.log(error));
  
}

}
