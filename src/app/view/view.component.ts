import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './../shared/auth.service';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewComponent implements OnInit {

  username:'';
  email:'';
  address:'';
  contact:'';

  user_bookings = [];


  usersRef: AngularFireList<any>;
  users: Observable<any[]>;
  
  bookingsRef: AngularFireList<any>;
  bookings: Observable<any[]>;

  slotsRef: AngularFireList<any>;
  slots: Observable<any[]>;

  currentUser;

  constructor(private router: Router, private db: AngularFireDatabase, public authService: AuthService, private af: AngularFireAuth, ) {

    this.usersRef = db.list('users');
    this.users = this.usersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.slotsRef = db.list('/slots');
    this.slots = this.slotsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    
  }

  ngOnInit() {
    this.af.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.users.subscribe(users => {
            this.currentUser = users.find((user) => user.key === auth.uid);
            this.username = this.currentUser.username;
            this.email = this.currentUser.email;
            this.address = this.currentUser.address || '';
            this.contact = this.currentUser.contact || '';

            this.bookingsRef = this.db.list('/bookings' , ref => ref.orderByChild('user_id').equalTo(this.currentUser.key));
            this.bookings = this.bookingsRef.snapshotChanges().map(changes => {
              return changes.map(c => ({
                key: c.payload.key, ...c.payload.val()
              }));
            });
          });
        }
      });
  }
  deleteBooking(key: string, slot_id: string) {
    this.bookingsRef.remove(key);
    this.slotsRef.update(slot_id, {booking_id: '000',  is_booked: false});
  }

  
  print(){
      let popupWinindow
      let innerContents = document.getElementById('printSectionId').innerHTML;
      popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
      popupWinindow.document.close();
}
  
}
