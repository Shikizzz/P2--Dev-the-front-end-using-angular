import { Component, Input, OnInit } from '@angular/core';
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
export class ChartComponent implements OnInit {
  @Input() chartConfig!: ChartConfig;

  chart: any;

  ngOnInit(): void {
    let chartData: any = {
      labels: this.chartConfig.labels,
      datasets: [{
        label: 'Medals',
        data: this.chartConfig.data,
        hoverOffset: 4
      }]
    };
    let config: any = {
      type: this.chartConfig.type,
      data: chartData,
    };

    this.chart = new Chart("MyChart", config);
  }

}
