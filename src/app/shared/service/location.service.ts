import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ISearchParams } from '../model/search-params.model';
import { ILocation } from '../model/location.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private server = 'http://arviem-api.us-east-1.elasticbeanstalk.com';

  constructor(
    private http: HttpClient
  ) { }

  add(location: ILocation): Observable<ILocation> {
    return this.http.post<ILocation>(`${this.server}/tenant1/locations`, location)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  get(id: string): Observable<ILocation> {
    return this.http.get<ILocation>(`${this.server}/tenant1/locations/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  search(params?: ISearchParams): Observable<ILocation[]> {
    return this.http.get<ILocation[]>(`${this.server}/tenant1/locations`, {params})
      .pipe(catchError(this.errorHandler));
  }

  update(location: ILocation): Observable<ILocation> {
    return this.http.put<ILocation>(`${this.server}/${location.resourceId}`, location)
    .pipe(catchError(this.errorHandler));
  }
}
