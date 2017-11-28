import { AuthGuard } from './../auth.guard';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ActivatedRoute} from '@angular/router';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import {MatSelectModule} from '@angular/material/select';



@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookingComponent implements OnInit {
  
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

  constructor() {
   }

  ngOnInit() {
   
  }

}
