import { Observable, of, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';

export abstract class BaseBackendService {
  constructor(protected apiService: ApiService) {}

  protected post<T, TResponse>(path: string, data: T): Observable<TResponse> {
    return this.apiService.callPostApi(path, data).pipe(
      mergeMap((response: any) => {
        if (response && response.error) {
          return throwError(response);
        }

        if (response && response.data !== undefined) {
          return of(response.data);
        }

        return of(response);
      })
    );
  }

  protected get<TResponse>(path: string, data?: any): Observable<TResponse> {
    return this.apiService.callGetApi(path).pipe(
      mergeMap((response: any) => {
        if (response && response.error) {
          return throwError(response);
        }

        if (response && response.data !== undefined) {
          return of(response.data);
        }

        return of(response);
      })
    );
  }
}
