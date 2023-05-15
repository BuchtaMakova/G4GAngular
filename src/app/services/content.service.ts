import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private http: HttpClient) {}

  createContent(obj: any) {
    return this.http
      .post('https://localhost:7100/api/Contents/Create', obj)
      .toPromise();
  }

  deleteComment(id: string) {
    return this.http
      .delete('https://localhost:7100/api/Comments/Delete?id=' + id)
      .toPromise();
  }

  updateContent(obj: any) {
    return this.http
      .put('https://localhost:7100/api/Contents/Update', obj)
      .toPromise();
  }

  createComment(obj: any) {
    return this.http
      .post('https://localhost:7100/api/Comments/Create', obj)
      .toPromise();
  }
}
