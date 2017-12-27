import { AuthService } from './../shared/auth.service';
import { AuthGuard } from './../auth.guard';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { BookingServiceService } from '../booking-service.service';


@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SlotsComponent implements OnInit {

  slotsRef: AngularFireList<any>;
  slots: Observable<any[]>;
  slotList = [];
  bk: any;
  is_booked: boolean;
  constructor(private router: Router, private bs: BookingServiceService, public authService: AuthService, private af: AngularFireAuth,
    private db: AngularFireDatabase,) { 

      this.slotsRef = db.list('/slots');
      this.slots = this.slotsRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
  }

  ngOnInit() {
    this.slots.subscribe(slot => {
      this.slotList = slot;
    });
    this.bk = this.bs.getBooking();
    console.log(this.bk);
  }

  updateSlot(val,i) {
    this.slotsRef = this.db.list('slots');
    this.slotsRef.update(val.key, {is_booked: true, booking_id: this.bk.key});
    this.db.list('bookings').update(this.bk.key, {slot_id: val.key, slot_name: val.name});
  }



}
