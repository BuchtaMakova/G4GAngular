import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.css'],
})
export class ContentDetailComponent {
  idContent: string | null | undefined;

  contentDetails: any = {};

  fetchContentDetails() {
    const url =
      'https://localhost:7100/api/Contents/GetById?id=' + this.idContent;
    let header = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + ''),
    };
    this.http.get<any>(url, header).subscribe(
      (response: any) => {
        this.contentDetails = response;
        console.log(this.contentDetails);
      },
      (error: any) => {
        if (error.status == 401) {
          console.log(error);
        }
      }
    );
  }
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route = route;
  }

  ngOnInit() {
    this.idContent = this.route.snapshot.paramMap.get('idContent');
    this.fetchContentDetails();
  }
}
