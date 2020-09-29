import * as d3 from 'd3';
import {DataService} from '../data-service/data.service';


export class CovidMap {
    private map: d3.Selection<any, any, any, any>;

    constructor(private dataService: DataService, private width = 1000) {
        this.dataService.pull()
            .then(this.create)
            .then(this.update);
    }
    private mouseOver = (e: MouseEvent, d: any): void => {
        d3.select(e.target as Element)
            .style('stroke', 'red');
    }
    private mouseOut = (e: MouseEvent, d: any): void => {
        d3.select(e.target as Element)
            .transition()
            .style('stroke', 'gray');
    }

    // public refreshData(): void {
    //     console.log('refreshing the map data');
    //     this.dataService.pull().then(this.update);
    // }

    /**
     * Create the svg, all the regions, and bind our pulled data to each region
     * @param data Our data pulled from the covid API.
     */
    public create = (data): any => {

        // Create the initial data set for d3
        this.map = d3.select('#the-map')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.width / 2)
            .selectAll('path')
            .data(data);

        // return data so we can chain this method
        return data;
    }

    public update = (regions): void => {
        const projection: d3.GeoProjection = d3.geoAlbersUsa().scale(1000);
        const borders: d3.GeoPath = d3.geoPath().projection(projection);
        const maxCases: number = d3.max(regions, ({stats}): number => stats.positiveCasesViral);
        const colors: d3.ScaleSequential<string> = d3.scaleSequential(d3.interpolateRdYlGn).domain([maxCases, 0]);

        // do these things for each new piece of data that
        // enters our existing data set that we don't already have
        this.map.enter()
            .append('path')
            .attr('d', borders)
            .attr('class', 'region')
            .on('mouseover', this.mouseOver)
            .on('mouseout', this.mouseOut)
            .style('stroke', 'gray')
            .style('fill', ({stats}) => {
                const cases = stats.positiveCasesViral;
                const gray = 'rgb(55, 55, 55)';
                return cases === null ? gray : colors(cases);
            });

        // do these things for each piece of data that
        // no longer belongs to our existing data set
        this.map.exit().remove();

    }

}




















