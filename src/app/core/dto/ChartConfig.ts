export class ChartConfig {
    constructor(
        public id: string,
        public type: string,
        public labels: string[],
        public data: number[],
        public countryIdsMap: Map<string, number>
    ) { }
}