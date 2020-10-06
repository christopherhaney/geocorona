import * as d3 from 'd3';
import {DataService} from '../data-service/data.service';


export class CovidMap {
    private map: d3.Selection<any, any, any, any>;
    private tooltip: d3.Selection<any, any, any, any>;

    constructor(private dataService: DataService, tooltipSelector: string, private width = 1000) {
        this.tooltip = d3.select(tooltipSelector);
        this.dataService.pull()
            .then(this.create)
            .then(this.update);
    }
    private mouseOver = (e: MouseEvent, d: any): void => {
        console.log(d);

        this.tooltip
            .select('p.title')
            .text(d.properties.NAME);

        this.tooltip
            .select('p.subtitle')
            .text(d.stats.positive);

        this.tooltip
            .style('visibility', 'visible');

    }

    private mouseMove = (e: MouseEvent, d: any): void => {

        // follow the mouse
        this.tooltip
            .style('top', `${e.pageY - 10}px`)
            .style('left', `${e.pageX + 10}px`);
    }

    private mouseOut = (e: MouseEvent, d: any): void => {
        this.tooltip.style('visibility', 'hidden');
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

        const projection = d3.geoAlbersUsa().scale(1000);
        const borders = d3.geoPath().projection(projection);

        const maxCases = d3.max(regions, ({stats}): number => stats.positive);
        const colors = d3.scaleSequential(d3.interpolateRdYlGn).domain([maxCases, 0]);

        // do these things for each new piece of data that
        // enters our existing data set that we don't already have
        this.map.enter()
            .append('path')
            .attr('d', borders)
            .attr('class', 'region')
            .on('mouseover', this.mouseOver)
            .on('mousemove', this.mouseMove)
            .on('mouseout', this.mouseOut)
            .style('stroke', 'gray')
            .style('fill', ({stats}) => {
                return stats.positive === null ? 'rgb(55, 55, 55)' : colors(stats.positive);
            });

        // do these things for each piece of data that
        // no longer belongs to our existing data set
        this.map.exit().remove();

    }

}

