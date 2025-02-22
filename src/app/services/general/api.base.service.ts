import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

/**
 *Api para la conexión con el server
 */
export class ApiService {
  /**
   *Url de la API
   */

  /**
   * Constructor
   */
  constructor(public httpClient: HttpClient) {}

  /**
   * Realiza un post a la api
   */
  post(path: string, data: any, showSpinner: boolean = true): Observable<any> {
    return this.httpClient.post(`${path}`, data);
  }

  refreshToken(path: string, data: any, showSpinner: boolean = true, headers: any): Observable<any> {
    return this.httpClient.post(`${path}`, data, {headers: headers});
  }

  /**
   * Realiza un put a la api
   */
  put(path: string, data?: any, showSpinner: boolean = true): Observable<any> {
    return this.httpClient.put(`${path}`, data);
  }

  /**
   * Realiza un patch a la api
   */
  patch(
    path: string,
    data?: any,
    showSpinner: boolean = true
  ): Observable<any> {
    return this.httpClient.patch(`${path}`, data);
  }

  /**
   * Realiza un delete a la api
   */
  delete(
    path: string,
    data: any,
    showSpinner: boolean = true
  ): Observable<any> {
    return this.httpClient.delete(`${path}`, data);
  }

  /**
   * Realiza un get a la api
   */
  get(
    path: string,
    showSpinner: boolean = true,
    headers?: any
  ): Observable<any> {
    return this.httpClient.get(`${path}`, headers);
  }

  /**
   * Realiza un get a la api
   */
  async getAsync(path: string, showSpinner: boolean = true): Promise<any> {
    return this.httpClient.get(`${path}`).toPromise();
  }

    /**
   * Realiza un get con options
   */
    getWithOptions<T>( path: string, options: { headers?: HttpHeaders, params?: HttpParams } ) : Observable<T> {
      return this.httpClient.get<T>(path, options )
    }
  

  /**
   * Realiza un post a la api
   */
  async postAsync(
    path: string,
    data: any,
    showSpinner: boolean = true
  ): Promise<any> {
    return this.httpClient.post(`${path}`, data).toPromise();
  }

  getFile(
    path: string,
    mimetype: string,
    originalName: string
  ): Observable<any> {
    return this.httpClient
      .get(path, { responseType: 'arraybuffer'})
      .pipe(
        map((response: any) => {
          const url = window.URL.createObjectURL(
            new Blob([response.data], { type:mimetype })
          )
          const link = document.createElement('a');
          document.body.appendChild(link);
          link.href = url;
          link.download = originalName;
          link.click();
          URL.revokeObjectURL(link.href);
        })
      );
  }

  postClob(
    path: string,
    filename: string,
    body: any,
    showSpinner: boolean = true
  ): Observable<any> {
    return this.httpClient
      .post(`${path}`, body, {
        responseType: 'blob' as 'json',
      })
      .pipe(
        map((response: any) => {
          const dataType = response.type;
          const binaryData = [];
          binaryData.push(response);
          const downloadLink = document.createElement('a');
          var objectUrl = window.URL.createObjectURL(
            new Blob(binaryData, { type: dataType })
          );
          downloadLink.href = objectUrl;
          downloadLink.click();
          URL.revokeObjectURL(objectUrl);
        })
      );
  }
}
