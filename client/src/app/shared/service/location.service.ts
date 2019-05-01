import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ISearchParams } from '../model/search-params.model';
import { ILocation } from '../model/location.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  get(id: string): Observable<ILocation> {
    return this.http.get<ILocation>(`${this.server}/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  search(params?: ISearchParams): Observable<ILocation[]> {
    return this.http.get<ILocation[]>(`${this.server}/`, {params})
      .pipe(catchError(this.errorHandler));
  }

  update(location: ILocation): Observable<ILocation> {
    const id = location.resourceId.replace('/tenant1/locations/', '');

    return this.http.put<ILocation>(`${this.server}/${id}`, location)
      .pipe(catchError(this.errorHandler));
  }
}
