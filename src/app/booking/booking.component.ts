import { AuthService } from './../shared/auth.service';
import { AuthGuard } from './../auth.guard';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import {FormControl,FormGroup,FormBuilder,Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ActivatedRoute} from '@angular/router';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {MatMenuModule} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as firebase from 'firebase/app';
import { BookingServiceService } from '../booking-service.service';
import * as moment from 'moment';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatSelectModule} from '@angular/material/select';




@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class BookingComponent implements OnInit {

  rForm:FormGroup;
  post: '';
  location: '';
  time: '';

 

  reserveHrs: '';  
  email:'';
  username:'';
  key:'';

 date = new Date().getDate()
 minDate= new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate() );
maxDate = new Date(2020, 0, 1);
 
  usersRef: AngularFireList<any>;
  users: Observable<any[]>;
  bookingsRef: AngularFireList<any>;
  bookings: Observable<any[]>;
  slotsRef: AngularFireList<any>;
  slots: Observable<any[]>;

  currentUserKey;
  currentUser;

  animal: string;
  name: string;

  bookingInfo = {key:'',username:'',email:'',location:'',date:'',time:'',reserveHrs:''};
  

  times = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
  hours = ['1 hr', '2 hrs', '3 hrs', '4 hrs', '5 hrs'];
  selected = {
    name: 'None',
    image: 'assets/image_empty.jpg'
  };
  locations = [
    { name: 'Karachi Airport',
      image: 'assets/karachi_airport.jpg'
    },
    { name: 'City Station',
      image: 'assets/city_station.jpg'
    },
    { name: 'Atrium Mall',
      image: 'assets/atrium_mall.jpg'
    },
  ]

  constructor(private fb: FormBuilder, private bs: BookingServiceService, private router: Router,public authService: AuthService, private af: AngularFireAuth,
    private db: AngularFireDatabase, public dialog: MatDialog ) {
    
      this.rForm = fb.group({
        'location':[null, Validators.required],
        'time':[null, Validators.required],
        'date':[null, Validators.required],
        'reserveHrs':[null, Validators.required],
      })

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

      this.bookingsRef = db.list('/bookings');
      this.bookings = this.bookingsRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });

      
    this.slotsRef = this.db.list('/slots');
    this.slots = this.slotsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.slots.subscribe(slot => {
      this.removeSlotIfExpred(slot);
    });

   }

   
  removeSlotIfExpred(slots) {
    console.log(slots);
    slots.map(slot => {
      if(moment().isAfter(slot.expiryDate)) {
        console.log('Slot is Expired');
       
        this.slotsRef.update(slot.key, {is_booked: false,uid: '000', expiryDate: null, booking_id: '000'});
        this.bookingsRef.remove(slot.booking_id);
      }
      console.log('Slot is not expired');
    });
  }
  

  ngOnInit() {

  }
  ViewSlot(val){
    console.log(val);
    const duration = moment.duration(moment(val.time, ["h:mm A"]).format("HH:mm")).asSeconds();
    const timeStamp = moment(val.date.toString()).add(duration, 's').toString();
    console.log(timeStamp);
    this.db.list('/bookings').push(
      {
        date: val.date.toDateString(), location: val.location,
        time: val.time, reserveHrs: val.reserveHrs,
        timeStamp: timeStamp,
        user_id: this.currentUser.key
      }
    ).then((data) => {
      val = {
        ...val,
        key: data.key,
        timeStamp: timeStamp,
      }
      this.bookingInfo = val;
      this.bs.setBooking(val);
      this.router.navigateByUrl('/slots')
    });
  }
}
