import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ApiOption {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  baseApiUrl = `${environment.apiUrl}`;

  callPostApi(
    path: string,
    request: any,
    option: ApiOption = {}
  ): Observable<any> {
    return this.http
      .post(`${this.baseApiUrl}${path}`, request, option)
      .pipe(map((data) => data));
  }

  callGetApi(path: string, option: ApiOption = {}): Observable<any> {
    return this.http
      .get(`${this.baseApiUrl}${path}`, option)
      .pipe(map((data) => data));
  }
}
