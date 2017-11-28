import { AppRoutesModule } from './../app.routes';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { Observable} from 'rxjs';
import { AuthService } from './../shared/auth.service';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
 
    

  constructor(private router: Router ) { 



    
  }

  ngOnInit() {
  }

}
