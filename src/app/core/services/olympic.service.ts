import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './/assets/mock/olympic.json';
  private olympic: Olympic[] = {} as Olympic[];  //for initialization of the following BehaviorSubject
  private olympics$ = new BehaviorSubject<Olympic[]>(this.olympic);

  constructor(private http: HttpClient, private router: Router) { }

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        console.error("An error occured loading data");
        this.olympics$.next(this.olympic);
        this.router.navigateByUrl("notFound");
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

}
