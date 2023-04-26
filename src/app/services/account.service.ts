import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  private isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject;

  // update the isLoggedInSubject to emit a new boolean value
  updateIsLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
  }

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

  logOut() {
    this.updateIsLoggedIn(false);
    console.log('logOut');
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
  }
}
