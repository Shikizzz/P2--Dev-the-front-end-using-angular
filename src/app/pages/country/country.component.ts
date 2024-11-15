import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartComponent } from "../../components/chart/chart.component";
import { ChartConfig } from 'src/app/core/dto/ChartConfig';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [
    ChartComponent,
  ],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent implements OnInit {
  myChartConfig!: ChartConfig;

  public olympics$!: Observable<Olympic[]>;
  public olympicId!: number;
  public olympicCountry!: Olympic;
  public medalsCount: number = 0;
  public athletesCount: number = 0;

  public subscription!: Subscription;


  constructor(private olympicService: OlympicService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympicId = this.route.snapshot.params['id'] as number;
    this.myChartConfig = new ChartConfig("MyLineChart", "line", [], [], { responsive: true });
    this.extractAllData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  extractAllData() {
    this.subscription = this.olympics$.subscribe(
      data => {
        let findResult: Olympic | undefined = data.find(olympic => olympic.id == this.olympicId);
        if (typeof findResult == "object") { this.olympicCountry = findResult; } //if country ID exists, we continue
        else this.router.navigateByUrl(`notFound`); // else we retirect to error page
        this.countAndInitializeChart();
      })
  }

  countAndInitializeChart() {
    this.olympicCountry.participations.forEach(participation => {
      this.athletesCount += participation.athleteCount;
      this.medalsCount += participation.medalsCount;
      this.myChartConfig.labels.push(participation.year.toString());
      this.myChartConfig.data.push(participation.medalsCount);
    })
  }

  goHome() {
    this.router.navigateByUrl(``);
  }

}
