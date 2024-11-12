import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartComponent } from 'src/app/components/chart/chart.component';
import { AsyncPipe } from '@angular/common';
import { ChartConfig } from 'src/app/core/dto/ChartConfig';
AsyncPipe


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChartComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  myChartConfig!: ChartConfig;

  public olympics$!: Observable<Olympic[]>;

  constructor(private olympicService: OlympicService) { }

  ngOnInit(): void {
    /*  this.olympics$ = this.olympicService.getOlympics();
      let olympics: Olympic[];
      this.olympics$.subscribe((o) => {
        olympics = o as Olympic[];
      });*/

    this.myChartConfig = new ChartConfig(
      "pie",
      ["USA", "France", "China"],
      [3, 2, 1]);
  }

}
