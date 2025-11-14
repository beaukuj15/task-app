import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root',
})
export class DataService {

  fetchUrl = "";

  constructor(private http: HttpClient) {
    this.fetchUrl = environment.apiUrl;
  }


  genericGET(path: string): Promise<any> {
    console.log("doiing get fetch to: " + this.fetchUrl + path);
    return this.fetch(this.fetchUrl + path, 'GET', null);
  }

  genericPOST(path: string, dto: any): Promise<any> {
    return this.fetch(this.fetchUrl + path, 'POST', dto);
  }

  genericPUT(path: string, dto: any): Promise<any> {
    return this.fetch(this.fetchUrl + path, 'PUT', dto);
  }

  genericDEL(path: string): Promise<any> {
    console.log("doiing delete fetch to: " + this.fetchUrl + path);
    return this.fetch(this.fetchUrl + path, 'DELETE', null);
  }

  protected async fetch(url: string, type: string, body: any = null, authenticated: boolean = true): Promise<any> {
    const config: { body: any; headers: HttpHeaders; withCredentials: boolean } = {
      body: body,
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
      }),
      withCredentials: authenticated,
    };

    return this.http
      .request<HttpResponse<Object>>(type, url, config)
      .toPromise()
      .then((res: any) => {
        return Promise.resolve(res);
      })
      .catch(err => {
        // TODO better error handling
        return Promise.resolve({ errors: err });
      });
  }
  
}
