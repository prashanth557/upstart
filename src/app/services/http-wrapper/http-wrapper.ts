//This HTTPwrapper is just a dummy wrapper.
//TODO: need to remove this once all the calls are migrated without this wrapper
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: any;
  withCredentials?: boolean;
  body?: any;
}

export function httpClientWrapperCreator(http: HttpClient) {
  return new HttpWrapper(http);
}

@Injectable()
export class HttpWrapper {

  // Extending the HttpClient through the Angular DI.
  public constructor(public http: HttpClient) {
    // If you don't want to use the extended versions in some cases you can access the public property and use the original one.
    // for ex. this.httpClient.http.get(...)
  }

  /**
   * GET request
   * @param {string} endPoint it doesn't need / in front of the end point
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public authenticatedGet<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.http.get<T>(endPoint, options);
  }

  /**
   * POST request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public authenticatedPost<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
    return this.http.post<T>(endPoint, params, options);
  }

  /**
   * PUT request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public authenticatedPut<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
    return this.http.put<T>(endPoint, params, options);
  }

  /**
   * DELETE request
   * @param {string} endPoint end point of the api
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public authenticatedDelete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.http.delete<T>(endPoint, options);
  }
}
