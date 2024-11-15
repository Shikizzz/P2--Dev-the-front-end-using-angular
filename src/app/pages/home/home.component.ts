import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartComponent } from 'src/app/components/chart/chart.component';
import { AsyncPipe } from '@angular/common';
import { ChartConfig } from 'src/app/core/dto/ChartConfig';
import { WinPerCountry } from 'src/app/core/dto/WinPerContry';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChartComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  myChartConfig!: ChartConfig;

  public olympics$!: Observable<Olympic[]>;
  public subscription!: Subscription;

  constructor(private olympicService: OlympicService, private router: Router) { }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.myChartConfig = new ChartConfig("MyPieChart", "pie", [], [], {});
    this.initilizeChart();
    this.generateRouting();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  initilizeChart() {
    let olympics: Olympic[] = [];
    this.subscription = this.olympics$.subscribe(
      data => {
        data.forEach(olympic => {
          olympics.push(olympic);
        })
        let winPerCountry: WinPerCountry[] = this.getMedalsPerCountry(olympics);
        this.myChartConfig.labels = winPerCountry.map(o => o.country);
        this.myChartConfig.data = winPerCountry.map(o => o.medals);
      }
    );
  }

  getMedalsPerCountry(olympics: Olympic[]): WinPerCountry[] {
    let winsArray: WinPerCountry[] = [];
    olympics.forEach(olympic => {
      let country: string = olympic.country;
      let medals: number = 0;
      olympic.participations.forEach(participation => {
        medals += participation.medalsCount
      });
      winsArray.push(new WinPerCountry(country, medals));
    });
    return winsArray;
  }

  generateRouting() {
    this.myChartConfig.options = {
      onClick: (event: any, elements: any) => {
        const clickedElement: number = elements[0].index;
        const countryId = clickedElement + 1;

        this.router.navigateByUrl('country/' + countryId)
      }
    }
  }

}
