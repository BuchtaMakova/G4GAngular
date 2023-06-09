import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ContentService } from '../../services/content.service';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.css'],
})
export class ContentDetailComponent implements OnInit {
  idContent: string | null | undefined;
  isLoggedIn: boolean = false;
  public user: any;
  userId: any;
  token = localStorage.getItem('jwt');
  contentDetails: any = {};
  displayElement = false;

  createComment = new FormGroup({
    text: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
  });

  updateContent = new FormGroup({
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
    private contentSevice: ContentService,
    private datePipe: DatePipe
  ) {
    this.route = route;
  }

  commentInfo: any;
  contentInfo: any;
  ngOnInit() {
    this.idContent = this.route.snapshot.paramMap.get('idContent');
    this.fetchContentDetails();

    if (!!this.token) this.accountService.updateIsLoggedIn(true);
    this.accountService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      console.log(this.isLoggedIn);
      if (this.accountService.isLoggedIn$.getValue()) {
        this.accountService
          .getAccount(localStorage.getItem('username'))
          .subscribe(
            (response: any) => {
              this.user = response.username;
              this.userId = response.idAccount;
              localStorage.setItem('idAccount', response.idAccount);
            },
            (error: any) => {
              if (error.status == 401) {
                console.log(error);
              }
            }
          );
      }
    });
  }

  onUpdateContent() {
    this.contentInfo = {
      id: this.contentDetails.idContent,
      headline: this.contentDetails.headline,
      text: this.updateContent.value.text,
      accountIdAccount: this.userId,
      subcategoryIdSubcategory: this.contentDetails.subcategoryIdSubcategory,
    };

    this.contentSevice.updateContent(this.contentInfo).then(() => {
      console.log('Post updated');
      this.updateContent.reset();
      this.fetchContentDetails();
      this.displayElement = false;
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
      this.contentSevice.createComment(this.commentInfo).then(() => {
        console.log('Createcontent form');
        this.createComment.reset();
        this.fetchContentDetails();
      });
      console.log('Form Submitted!');
      this.createComment.reset();
    }
  }
  formatDate(date: any) {
    return this.datePipe.transform(date, 'dd.MM.yyyy');
  }
}
