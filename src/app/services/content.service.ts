import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private http: HttpClient) {}

  createContent(obj: any) {
    this.http
      .post('https://localhost:7100/api/Contents/Create', obj)
      .subscribe((res) => {
        console.log('odeslal se post');
      });
  }

  createComment(obj: any) {
    this.http
      .post('https://localhost:7100/api/Comments/Create', obj)
      .subscribe((res) => {
        console.log('odeslal se post na comment');
      });
  }
}
