import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ISearchParams } from '../model/search-params.model';
import { ILocation } from '../model/location.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { mapLocationId, getLocationId } from '@app/util/helper';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public server = `${environment.host}/api/locations`;

  constructor(
    private http: HttpClient
  ) { }

  add(location: ILocation): Observable<ILocation> {
    return this.http.post<ILocation>(`${this.server}`, location)
      .pipe(
        map(result => mapLocationId(result)),
        catchError(this.errorHandler)
      );
  }

  getById(id: number): Observable<ILocation> {
    return this.http.get<ILocation>(`${this.server}/${id}`)
      .pipe(
        map(result => mapLocationId(result)),
        catchError(this.errorHandler));
  }

  search(params?: ISearchParams): Observable<ILocation[]> {
    return this.http.get<ILocation[]>(`${this.server}`, {params})
      .pipe(
        map(result => result.map(location => mapLocationId(location))),
        catchError(this.errorHandler));
  }

  update(location: ILocation): Observable<ILocation> {
    const id = getLocationId(location);
    delete location.id;

    return this.http.put<ILocation>(`${this.server}/${id}`, location)
      .pipe(
        map(result => mapLocationId(result)),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
