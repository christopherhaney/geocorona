
export class GeoRegion {

    public tests: number;
    public cases: number;
    public deaths: number;
    public recovered: number;
    public geometry: any[];

    constructor(public name: string) {
    }

    public setStats(stats: any): void {
        this.tests = stats.totalTestResults;
        this.cases = stats.positive;
        this.deaths = stats.death;
        this.recovered = stats.recovered;
    }

    // public setRegion(entry: any): void {
    //     this.name = entry.properties['woe-name'];
    //     this.geometry = entry;
    // }
}

