import { AuthService } from './../shared/auth.service';
import { AuthGuard } from './../auth.guard';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import {FormControl} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ActivatedRoute} from '@angular/router';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {MatMenuModule} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatSelectModule} from '@angular/material/select';




@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class BookingComponent implements OnInit {

  animal: string;
  name: string;

  times = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '3:00 PM', '5:00 PM'];
  hours = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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

  constructor(private router: Router,public authService: AuthService, private af: AngularFireAuth,
    private db: AngularFireDatabase, public dialog: MatDialog ) {
    
   }

  

  ngOnInit() {
   
  }

}
