import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  @Input() dataList = [];
  @Output() openDetailsEvent: EventEmitter<any>;

  constructor(private router: Router) {
    this.openDetailsEvent = new EventEmitter<any>();
  }

  ngOnInit() {
  }


}
