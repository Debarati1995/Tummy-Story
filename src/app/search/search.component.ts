import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiSettings } from '../global/api.settings';
import { CommonService } from '../global/common.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  locationText = ''; // holds user input for location
  searchText = ''; // holds search-keyword
  suggestedLocations = []; // holds list of suggested locations according to user input
  latitude: any; // holds value of selected location's latitude
  longitude: any; // holds value of selected location's longitude
  currentGeoCode: any; // holds geoCode obj of current Location
  selectedLocation: any; // holds information object of selected location

  @Output() geoCodeEvent: EventEmitter<any>;
  @Output() searchEvent: EventEmitter<any>;
  @Output() searchLocationEvent: EventEmitter<any>;

  constructor(private service: CommonService) {
    this.geoCodeEvent = new EventEmitter<any>();
    this.searchEvent = new EventEmitter<any>();
    this.searchLocationEvent = new EventEmitter<any>();
  }

  ngOnInit() {
    this.getCurrentLocation();
  }

  // function to get user's current location
  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((location: any) => {
      this.latitude = location.coords.latitude;
      this.longitude = location.coords.longitude;
      this.fetchLocationDetails();
    });
  }

  // function to get list of locations and and restaurants as search result
  getSearchResults(type = '') {
    let url;
    if (type === 'location') {
      url = ApiSettings.searchLocation + '?query=' + this.locationText;
    } else {
      if (this.searchText && this.searchText.length) {
        if (this.selectedLocation) {
          this.searchEvent.emit(
            {
              searchText: this.searchText,
              selectedLocation: this.selectedLocation
            }
          );
        }
      } else {
        this.fetchLocationDetails();
      }
    }

    this.service.getServiceData(url).then((response: any) => {
      this.suggestedLocations = response.location_suggestions;
    });
  }

  // function to get details of current user location
  fetchLocationDetails() {
    const url = ApiSettings.getGeoCode + '?lat=' + this.latitude + '&lon=' + this.longitude;
    this.service.getServiceData(url).then((response: any) => {
      this.currentGeoCode = response;
      this.selectedLocation = this.currentGeoCode.location;
      this.locationText = this.selectedLocation.title;
      this.geoCodeEvent.emit(this.currentGeoCode);
    });
  }

  // function to set location parameters on user search
  selectArea(area) {
    this.selectedLocation = area;
    this.latitude = area.latitude;
    this.longitude = area.longitude;
    this.suggestedLocations = [];
    this.fetchLocationDetails();
  }


}
