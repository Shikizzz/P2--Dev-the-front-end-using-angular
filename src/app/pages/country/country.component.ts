import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartComponent } from "../../components/chart/chart.component";
import { ChartConfig } from 'src/app/core/dto/ChartConfig';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [
    ChartComponent
  ],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent implements OnInit {
  myChartConfig!: ChartConfig;

  public olympics$!: Observable<Olympic[]>;

  constructor(private olympicService: OlympicService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    const olympicId = this.route.snapshot.params['id'] //then use .find((array.id) => id === olympicId) 

    this.myChartConfig = new ChartConfig(
      "line",
      ["2018", "2020", "2022", "2024"],
      [8, 10, 6, 14]);
  }

}
