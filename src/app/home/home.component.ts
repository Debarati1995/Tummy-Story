import { Component, OnInit } from '@angular/core';
import { CommonService } from '../global/common.service';
import { ApiSettings } from '../global/api.settings';
import Utils from '../global/Utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showList = true; // holds flag to show the list of restaurants
  restaurantList = []; // holds the list of near-by restaurants
  geoCodeObj: any; // holds geoCode obj of selected Location
  searchText = ''; // holds user input text to search restaurants by name
  entityType: string; // holds value of selected location's entity type
  entityId = ''; // holds value of selected location's entity id
  latitude: any; // holds value of selected location's latitude
  longitude: any; // holds value of selected location's longitude

  constructor(private service: CommonService) {
  }

  ngOnInit() {
  }

  getRestaurantList(searchObj) {
    const sortBy = 'rating';
    const sortOrder = 'desc';
    const searchText = searchObj.searchText;
    const entityId = this.entityId;
    const entityType = this.entityType;
    const lat = this.latitude;
    const lon = this.longitude;
    const urlParams = 'entity_id=' + entityId + '&entity_type=' + entityType + '&q=' + searchText + '&lat=' + lat + '&lon=' + lon;
    const url = ApiSettings.restaurantList + '?' + urlParams + '&sort=' + sortBy + '&order=' + sortOrder;
    this.service.getServiceData(url).then((res: any) => {
      if (res) {
        console.log(res);
        this.restaurantList = res.restaurants;
      }
    });
  }

  onOpeningDetails(val) {
    this.showList = val;
  }

  getGeoCodeDetails(obj) {
    this.getSelectedLocation(obj.location);
    this.geoCodeObj = obj;
    Utils.sortArray(obj.nearby_restaurants, 'restaurant', 'user_rating.aggregate_rating', false);
    this.restaurantList = obj.nearby_restaurants;
  }

  getSelectedLocation(userLocation) {
    this.latitude = userLocation.latitude;
    this.longitude = userLocation.longitude;
    this.entityId = userLocation.entity_id;
    this.entityType = userLocation.entity_type;
  }

}
