import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class LocationService {
    private url = 'http://arviem-api.us-east-1.elasticbeanstalk.com/tenant1/locations'
    constructor(
        private http: HttpService
    ) {}

    getLocations(params = {}): Observable<AxiosResponse<string>> {
        return this.http.get(`${this.url}`, {params})
          .pipe(
            map(result => result.data)
          );
    }

    getLocation(id: string): Observable<AxiosResponse<any>> {
        return this.http.get(`${this.url}/${id}`)
        .pipe(
          map(result => result.data)
        );
    }

    addLocation(location: any): Observable<AxiosResponse<any>> {
        return this.http.post(`${this.url}`, location)
        .pipe(
          map(result => result.data)
        );
    }

    updateLocation(location: any): Observable<AxiosResponse<any>> {
        return this.http.post(`${this.url}`, location)
        .pipe(
          map(result => result.data)
        );
    }
}
