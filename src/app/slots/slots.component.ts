import { AuthService } from './../shared/auth.service';
import { AuthGuard } from './../auth.guard';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import * as moment from 'moment';
import { BookingServiceService } from '../booking-service.service';


@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SlotsComponent implements OnInit {
  usersRef: AngularFireList<any>;
  users: Observable<any[]>;
  slotsRef: AngularFireList<any>;
  slots: Observable<any[]>;
  bookingsRef: AngularFireList<any>;
  bookings: Observable<any[]>;


  slotList = [];
  bookingList = [];
  bk: any;
  is_booked: boolean;
  currentUserKey;
  currentUser;

  email:'';
  username:'';

  constructor(private router: Router, private bs: BookingServiceService, public authService: AuthService, private af: AngularFireAuth,
    private db: AngularFireDatabase,) { 

      this.usersRef = db.list('/users');
      this.users = this.usersRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });

      this.af.authState.subscribe(
        (auth) => {
          if (auth != null) {
            this.users.subscribe(users => {
              this.currentUser = users.find((user) => user.key === auth.uid);
              this.username = this.currentUser.username;
              this.email = this.currentUser.email;
          });
        }
      });
  }

  removeSlotIfExpred(slots) {
    console.log(slots);
    slots.map(slot => {
      if(moment().isAfter(slot.expiryDate)) {
        console.log('Slot is Expired');
        this.bookingsRef.remove(slot.booking_id);
        this.slotsRef.update(slot.key, {is_booked: false,uid: '000', expiryDate: null, booking_id: '000'});
      }
      console.log('Slot is not expired');
    });
  }

  ngOnInit() {
    this.bk = this.bs.getBooking();
    console.log(this.bk);
    let location = '';
    switch(this.bk.location.name) {
      case 'Karachi Airport':
        location = 'airport';
        break;
      case 'City Station':
        location = 'cityStation';
        break;
      case 'Atrium Mall':
        location = 'atrium';
        break;
    }
    this.bookingsRef = this.db.list('/bookings');
    this.bookings = this.bookingsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.bookings.subscribe(booking => {
      this.bookingList = booking;
    });

    this.slotsRef = this.db.list('/slots', ref => ref.orderByChild('location').equalTo(location));
    this.slots = this.slotsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.slots.subscribe(slot => {
      this.slotList = slot;
      this.removeSlotIfExpred(this.slotList);
    });
    
  }

  updateSlot(val,i) {
   this.slotsRef = this.db.list('slots');
   console.log(val);
   let bid = '000';
   let uid = '000';
   let isBooked = false;
   const hrs = parseInt(this.bk.reserveHrs);
   const expiryDate = moment(this.bk.timeStamp).add(hrs, 'h');
  
    if(!val.is_booked) {
      isBooked= true;
      bid = this.bk.key;
      uid = this.currentUser.key;
    }
    if(val.uid === '000' || val.uid === this.currentUser.key) {
      this.slotsRef.update(val.key, {is_booked: isBooked, booking_id: bid, uid: uid, expiryDate: expiryDate.toString()});
      this.db.list('bookings').update(this.bk.key, {slot_id: val.key, slot_name: val.name});
    }
 
  }



}
