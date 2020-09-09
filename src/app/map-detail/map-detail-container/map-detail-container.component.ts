import { Component, OnInit } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { DataService } from './../data.service';

@Component({
  selector: 'app-map-detail-container',
  templateUrl: './map-detail-container.component.html',
  styleUrls: ['./map-detail-container.component.sass']
})
export class MapDetailContainerComponent implements OnInit {

  public stateRecords: any[] = [];

  constructor(private data: DataService) { }

  async ngOnInit() {
    await this.getData();
  }

  private async getData() {
    await this.httpGetAsync(this.data.covid_data, (response) => {
      let data = JSON.parse(response);
      this.storeData(data);
    });
  }

  private storeData(data) {
    data.forEach(element => {
      this.stateRecords.push(element);
    });
    console.log(this.stateRecords);
  }

  private async httpGetAsync(theUrl: string, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
  }

}
