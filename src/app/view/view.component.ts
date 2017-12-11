import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
