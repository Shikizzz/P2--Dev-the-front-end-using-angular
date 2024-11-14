export class ChartConfig {
    constructor(
        public type: string,
        public labels: string[],
        public data: number[],
        public options: any
    ) { }
}