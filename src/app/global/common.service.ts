import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiSettings } from './api.settings';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  getServiceData(url: string) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Accept': 'application/json',
        'user-key': ApiSettings.API_KEY
      });

      const requestOptions = {
        headers
      };

      this.http.get(url, requestOptions).subscribe(response => {
        if (response) {
          const data = response;
          resolve(data);
        }
      });

    });
  }
}
