import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatAccordion } from '@angular/material/expansion';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  styles: [
    `
      ::ng-deep .Category-container > .mat-expansion-indicator:after {
        color: white;
      }
    `,
  ],
})
export class CategoryComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  categories: any[] = [];

  visible = false;

  toggleCollapse(): void {
    this.visible = !this.visible;
  }
  constructor(private http: HttpClient) {
    this.accordion = new MatAccordion();
  }
  ngOnInit(): void {
    this.fetchCategories();
  }
  fetchCategories() {
    const url = 'https://localhost:7100/api/Categories/GetCategories';
    let header = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + ''),
    };
    this.http.get<any>(url, header).subscribe(
      (response: any) => {
        this.categories = response;
      },
      (error: any) => {
        if (error.status == 401) {
          console.log(error);
        }
      }
    );
  }
}
