import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiSettings } from '../global/api.settings';
import { CommonService } from '../global/common.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {
  selectedId = null; // holds id of selected restaurant
  restaurantDetail: any; // holds details object of selected restaurant

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: CommonService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        this.selectedId = params.id;
        this.getRestaurantDetails();
      }
    });
  }

  ngOnInit() {
  }

  getRestaurantDetails() {
    const url = ApiSettings.restaurantDetails + '?res_id=' + this.selectedId;
    this.service.getServiceData(url).then((res: any) => {
      this.restaurantDetail = res;
    });
  }

  backToList() {
    this.router.navigate(['/home']);
  }

}
