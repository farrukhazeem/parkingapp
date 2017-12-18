import { AuthService } from './../shared/auth.service';
import { AuthGuard } from './../auth.guard';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';

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

  constructor(private router: Router,public authService: AuthService, private af: AngularFireAuth,
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
  }

  updateSlot(val) {
   this.slotsRef = this.db.list('slots');
    console.log(val);
    this.slotsRef.update(val.key, {is_booked: true});
  }
}
