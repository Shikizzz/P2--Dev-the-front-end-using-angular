import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartTypeRegistry, registerables } from 'chart.js';
import { ChartEvent } from 'chart.js/dist/core/core.plugins';
import { ActiveElement } from 'chart.js/dist/plugins/plugin.tooltip';
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
  chart!: Chart;

  constructor(private router: Router) { };

  ngAfterViewInit(): void {

    new Chart(this.chartConfig.id, {
      type: this.chartConfig.type as keyof ChartTypeRegistry, //forcing, because we give a String, and not every string is valid
      data: {
        labels: this.chartConfig.labels,
        datasets: [{
          label: 'Medals',
          data: this.chartConfig.data
        }]
      },
      options:
        this.chartConfig.type == "pie" ? //if the Chart is a Pie, we configure routing
          {
            onClick: (event: ChartEvent, elements: ActiveElement[]) => {
              console.log(typeof (elements));
              const clickedElement: number = elements[0].index;
              const country: string = this.chartConfig.labels[clickedElement];
              this.router.navigateByUrl('country/' + this.chartConfig.countryIdsMap.get(country));
            }
          } : { responsive: true }
    }
    );
  }

}
