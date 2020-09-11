import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import * as d3 from 'd3';  // npm i d3 --save && npm i @types/d3 --save-dev

@Component({
  selector: 'app-map-detail-container',
  templateUrl: './map-detail-container.component.html',
  styleUrls: ['./map-detail-container.component.sass']
})
export class MapDetailContainerComponent implements OnInit {
  constructor(private data: DataService) {}

  async ngOnInit(): Promise<void> {

    const promises = [
      fetch(this.data.covid_data).then(handleHttpResponse),
      await d3.json('../../../assets/geoData.json')
    ];

    Promise.all(promises)
        .then(mergeData)
        .then(drawMap);
  }

}
/**
 * Associate the covid infection data with the geography data.
 * @param covidData Data pulled from a covid API
 * @param features Data pulled from our geography data
 */
function mergeData([covidData, {features}]): any {

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

/**
 * Returns the parsed json from a HTTP response if successful, else throws.
 * @param resp The raw response from our HTTP request.
 */
function handleHttpResponse(resp: Response): Promise<any> {
  if (resp.ok) {
    return resp.json();
  }
  else {
    throw new Error('Network response was not ok');
  }
}

/**
 * Draws the map using dataset of merged covid stats and geography data.
 * @param regions The merged covid stats and geography data.
 */
function drawMap(regions): void {

  // todo: remove magic numbers.
  // todo: make map update-able.
  const width = 1000;  // px
  const projection = d3.geoAlbersUsa().scale(1000);
  const borders = d3.geoPath().projection(projection);

  const maxCases: number = d3.max(regions, ({stats}) => stats.positiveCasesViral);
  const colors = d3.scaleSequential(d3.interpolateRdYlGn).domain([maxCases, 0]);

  // in d3 its convention to un-indent functions that change the data, like .enter()
  d3.select('#the-map')
      .append('svg')
      .attr('width', width)
      .attr('height', width / 2)
      .selectAll('path')
      .data(regions)
      .enter()
      .append('path')
      .attr('d', borders)
      .attr('class', 'region')
      .style('fill', ({stats}) => colors(stats.positiveCasesViral));
}
