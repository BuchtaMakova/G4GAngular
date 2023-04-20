import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  onLogin(obj: any): Observable<any> {
    return this.http.post('https://localhost:7100/api/Users/Login', obj, {
      responseType: 'text',
    });
  }

  public getAccount(username: any): Observable<any> {
    return this.http.get(
      'https://localhost:7100/api/Users/ByUsername?name=' + username
    );
  }
}
