import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private covidUrl = 'https://api.covidtracking.com/v1/states/current.json';
  private USAStateGeoUrl = '../../../assets/USA_State_Geography.json';

  constructor() { }

  /**
   * Returns the parsed json from a HTTP response if successful, else throws.
   * @param resp The raw response from our HTTP request.
   */
  private static handleHttpResponse(resp: Response): Promise<any> {
    if (resp.ok) {
      return resp.json();
    }
    else {
      throw new Error('Network response was not ok');
    }
  }

  public async pull(): Promise<any> {
    console.log('pulling data');

    const dataPulled = [
        await this.pullCovidStats(),
        await this.pullUSAStateGeoData()
    ];
    return Promise.all(dataPulled).then(this.mergeData);
  }

  private async pullCovidStats(): Promise<any> {
    // return this.http.get(this.covidUrl).then(DataService.handleHttpResponse);
    return fetch(this.covidUrl)
        .then(DataService.handleHttpResponse);
  }

  private async pullUSAStateGeoData(): Promise<any>  {
    return d3.json(this.USAStateGeoUrl);
  }

  /**
   * Associate the covid infection data with the geography data.
   * @param covidData Data pulled from a covid API
   * @param features Data pulled from our geography data
   */
  private mergeData([covidData, {features}]): any {

    // first create a map of state to its data.
    const covidMap: Map<string, any> = new Map();
    for (const d of covidData) {
      covidMap[d.fips] = d;
    }

    // Use the map to add covid data to each geographic feature
    features.forEach(d => {
      d.stats = covidMap[d.properties.STATE];
    });

    return features;
  }

}
