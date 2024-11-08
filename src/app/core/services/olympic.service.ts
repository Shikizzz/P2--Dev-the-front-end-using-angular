import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { WinPerCountry } from '../dto/winPerContry';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympic: Olympic[] = {} as Olympic[];  //for initialization of the following BehaviorSubject
  private olympics$ = new BehaviorSubject<Olympic[]>(this.olympic);

  constructor(private http: HttpClient) { }

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(this.olympic);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }
  getPieChartData() {
    let pieChartData: WinPerCountry[];
    let medalsCounter: number = 0;
    this.olympics$.subscribe((olympics) => {
      olympics.forEach((olympic) => {
        olympic.participations.forEach((participation) => medalsCounter += participation.medalsCount);
        pieChartData.push(new WinPerCountry(olympic.country, medalsCounter));
        medalsCounter = 0;
      })
    });
    return WinPerCountry;
  }
}
