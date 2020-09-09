import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  covid_data = 'https://api.covidtracking.com/v1/states/current.json';

  constructor(private http: HttpClient) { }

  public getInfo() {
    return this.http.get(this.covid_data);
  }
}
