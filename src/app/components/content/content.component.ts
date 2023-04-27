import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  contents: any[] = [];

  idSubcategory: any;
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route = route;
  }
  ngOnInit() {
    this.idSubcategory = this.route.snapshot.paramMap.get('idSubcategory');
    if (this.idSubcategory !== null) {
      this.fetchContents();
    }
  }

  fetchContents() {
    const url =
      'https://localhost:7100/api/Contents/GetContents?subcategoryIdSubcategory=' +
      this.idSubcategory;
    let header = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + ''),
    };
    this.http.get<any>(url, header).subscribe(
      (response: any) => {
        this.contents = response;
      },
      (error: any) => {
        if (error.status == 401) {
          console.log(error);
        }
      }
    );
  }
}
