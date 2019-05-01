import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ISearchParams } from '../model/search-params.model';
import { ILocation } from '../model/location.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private server = `${environment.host}/api/locations`;

  constructor(
    private http: HttpClient
  ) { }

  add(location: ILocation): Observable<ILocation> {
    return this.http.post<ILocation>(`${this.server}`, location)
      .pipe(
        map(this.mapLocationId),
        catchError(this.errorHandler)
      );
  }

  getById(id: number): Observable<ILocation> {
    return this.http.get<ILocation>(`${this.server}/${id}`)
      .pipe(
        map(this.mapLocationId),
        catchError(this.errorHandler));
  }

  search(params?: ISearchParams): Observable<ILocation[]> {
    return this.http.get<ILocation[]>(`${this.server}/`, {params})
      .pipe(
        map(result => result.map(this.mapLocationId)),
        catchError(this.errorHandler));
  }

  update(location: ILocation): Observable<ILocation> {
    return this.http.put<ILocation>(`${this.server}/${location.id}`, location)
      .pipe(
        map(this.mapLocationId),
        catchError(this.errorHandler)
      );
  }

  private errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  private mapLocationId(location: ILocation): ILocation {
    location.id = parseInt(location.resourceId.replace(/.+\/(\d+)$/g, '$1'), 10);
    return location;
  }
}
