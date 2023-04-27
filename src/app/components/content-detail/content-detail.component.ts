import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ContentService } from '../../services/content.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.css'],
})
export class ContentDetailComponent implements OnInit {
  idContent: string | null | undefined;
  isLoggedIn: boolean = false;

  contentDetails: any = {};

  createComment = new FormGroup({
    text: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
  });

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
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private accountService: AccountService,
    private contentSevice: ContentService
  ) {
    this.route = route;
  }

  commentInfo: any;
  ngOnInit() {
    this.idContent = this.route.snapshot.paramMap.get('idContent');
    this.fetchContentDetails();
    this.accountService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      console.log(this.isLoggedIn);
    });
  }

  onSubmit() {
    if (this.createComment.valid) {
      this.commentInfo = {
        text: this.createComment.value.text,
        posted:
          formatDate(new Date(), 'yyyy-MM-dd', 'en-US', 'Europe/Prague') +
          'T' +
          formatDate(new Date(), 'HH:mm:ss', 'en-US', 'Europe/Prague'),
        accountIdAccount: localStorage.getItem('idAccount'),
        contentIdContent: this.idContent,
      };
      this.contentSevice.createComment(this.commentInfo);
      console.log('Form Submitted!');
      this.createComment.reset();
    }
  }
}
