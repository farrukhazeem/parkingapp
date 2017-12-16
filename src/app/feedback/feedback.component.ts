import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
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
  data: any;
  usersRef: AngularFireList<any>;
  users: Observable<any[]>;
  feedbacks: Observable<any[]>;
  feedbacksRef: AngularFireList<any>;

  applyF = { key: '', comment: '', username: '', email: '' };
  arr = [];
  key;
  username;
  constructor(private fb: FormBuilder, private router: Router, public authService: AuthService, private af: AngularFireAuth,
    private db: AngularFireDatabase) {

    this.usersRef = db.list('/users');
    this.users = this.usersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));

    });

    this.usersRef.snapshotChanges(['child_added'])
      .subscribe(actions => {
        this.arr = [];
        actions.forEach(action => {
          this.key = action.payload.val().username;
        });
      });

    this.feedbacksRef = db.list('/feedbacks');
    this.feedbacks = this.feedbacksRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });



  }

  ngOnInit() {
    // console.warn();
    this.af.authState.subscribe(auth => {
      this.data = auth
      if (auth) {
        this.db.list('/users/' + auth.uid).snapshotChanges(['child_added'])
          .subscribe(actions => {
            actions.forEach(action => {
              if (action.key === 'username') {
                console.warn();

               this.username = action.payload.val();
              }

            });
          })
      }
    })

    console.warn(this.data)
  }
  submit(comment) {

    this.feedbacksRef.push({ comment: comment.model, email: this.af.auth.currentUser.email, });

    this.applyF.comment = '';
  }


}
