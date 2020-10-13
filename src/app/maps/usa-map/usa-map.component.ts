import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data-service/data.service';
import {CovidMap} from '../../services/map-service/map.service';

@Component({
  selector: 'app-usa-map',
  templateUrl: './usa-map.component.html',
  styleUrls: ['./usa-map.component.scss']
})
export class UsaMapComponent implements OnInit {

  constructor(private data: DataService) {

  }

  ngOnInit(): void {
    const map = new CovidMap(this.data, '#the-tooltip');
  }
}
