import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartComponent } from 'src/app/components/chart/chart.component';
import { AsyncPipe } from '@angular/common';
import { ChartConfig } from 'src/app/core/dto/ChartConfig';


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

  constructor(private olympicService: OlympicService) { }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.myChartConfig = new ChartConfig("MyPieChart", "pie", [], [], new Map<string, number>());
    this.configureChart();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  configureChart() {
    let olympics: Olympic[] = [];
    this.subscription = this.olympics$.subscribe(
      data => {
        data.forEach(olympic => {
          olympics.push(olympic);
        })
        let winPerCountry: Map<string, number> = this.getMedalsPerCountry(olympics); //we count medals for each country
        this.myChartConfig.labels = Array.from(winPerCountry.keys());
        this.myChartConfig.data = Array.from(winPerCountry.values());
        this.myChartConfig.countryIdsMap = this.setCountryIdMap(olympics); //mapping country with Ids, 
      }
    );
  }

  getMedalsPerCountry(olympics: Olympic[]): Map<string, number> {
    let winsArray: Map<string, number> = new Map();;
    olympics.forEach(olympic => {
      let country: string = olympic.country;
      let medals: number = 0;
      olympic.participations.forEach(participation => {
        medals += participation.medalsCount
      });
      winsArray.set(country, medals);
    });
    return winsArray;
  }

  setCountryIdMap(olympics: Olympic[]): Map<string, number> {
    let countryIds: Map<string, number> = new Map<string, number>();
    olympics.forEach(olympic => {
      countryIds.set(olympic.country, olympic.id);
    });
    return countryIds;
  }

}
