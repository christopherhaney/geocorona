import * as d3 from 'd3';
import {DataService} from '../data-service/data.service';

import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/scale-subtle.css';

export class CovidMap {
    private map: d3.Selection<any, any, any, any>;
    // private tooltip: d3.Selection<any, any, any, any>;

    constructor(private dataService: DataService, private tooltipSelector: string, private width = 1000) {
        // this.tooltip = d3.select(tooltipSelector);
        this.dataService.pull()
            .then(this.create)
            .then(this.update);
    }

    // private tooltip(): d3.Selection<any, any, any, any> {
    //     return d3.select(this.tooltipSelector);
    // }

    private mouseOver = (e: MouseEvent, d: any): void => {
        console.log(d);
        const selector = '#' + d.stats.state.toLowerCase();

        // all tippy options: https://atomiks.github.io/tippyjs/v6/all-props/
        tippy(selector, {
            allowHTML: true,  // because our tippy content has html inside
            content: this.getTooltipContent(d.properties.NAME, d.stats),
        });

    }

    private getTooltipContent(stateName: string, stats: any): string {

        const positiveIncrease = stats.positiveIncrease ? `(${stats.positiveIncrease.toLocaleString()} increase)` : '';
        const deathIncrease = stats.deathIncrease ? `(${stats.deathIncrease.toLocaleString()} increase)` : '';

        return `
            <p style="font-size: 2em; line-height: 0;">${stateName}</p>

            <table>
                <tr>
                    <td style="white-space: nowrap; text-align: right; color: yellow;">Positive Cases:</td>
                    <td>${stats.positive.toLocaleString()} ${positiveIncrease.toLocaleString()}</td>
                </tr>
                <tr>
                    <td style="text-align: right; color: yellow;">Hospitalized:</td>
                    <td>${stats.hospitalizedCurrently.toLocaleString()} (${stats.inIcuCurrently.toLocaleString()} in ICU)</td>
                </tr>
                <tr>
                    <td style="text-align: right; color: yellow;">Deaths:</td>
                    <td>${stats.death.toLocaleString()} ${deathIncrease}</td>
                </tr>
            </table>

            <p style="font-size: 0.8em; color: #999;">
                Updated ${stats.lastUpdateEt} EST (quality: ${stats.dataQualityGrade})
            </p>
        `;

    }

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
            // .attr('data-tippy-content', 'tooltip')
            .on('mouseover', this.mouseOver)
            // .on('mousemove', this.mouseMove)
            // .on('mouseout', this.mouseOut)
            .attr('id', ({stats}) => stats.state.toLowerCase())
            .style('stroke', 'gray')
            .style('fill', ({stats}) => {
                return stats.positive === null ? 'rgb(55, 55, 55)' : colors(stats.positive);
            });

        // do these things for each piece of data that
        // no longer belongs to our existing data set
        this.map.exit().remove();

    }

}

