import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private auth: AuthService, private http: HttpClient) { }

  secureGet(url) {
    let headers = this.headers();
    return this.http.get(url, { 'headers':  headers }).toPromise();
  }

  headers():HttpHeaders {
    let headers = new HttpHeaders()
       .set('content-type', 'application/json')
       .set('Access-Control-Allow-Origin', '*')
       .set('authentication', this.auth.getToken());
    return headers;
  }
}
