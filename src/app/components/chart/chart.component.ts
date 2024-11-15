import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartConfig } from 'src/app/core/dto/ChartConfig';
Chart.register(...registerables)

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements AfterViewInit {
  @Input() chartConfig!: ChartConfig;
  chart: any;

  ngAfterViewInit(): void {
    let chartData: any = {
      labels: this.chartConfig.labels,
      datasets: [{
        label: 'Medals',
        data: this.chartConfig.data
      }]
    };
    let config: any = {
      type: this.chartConfig.type,
      data: chartData,
      options: this.chartConfig.options
    };
    console.log(this.chartConfig.id);
    this.chart = new Chart(this.chartConfig.id, config);
  }

}
