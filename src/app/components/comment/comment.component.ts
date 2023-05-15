import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AccountService } from '../../services/account.service';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input() comments: any[] = [];
  @Output() submitEvent = new EventEmitter<any>();
  displayElement = false;
  public user: any;

  constructor(
    private datePipe: DatePipe,
    private accountService: AccountService,
    private contentService: ContentService
  ) {}

  isLoggedIn: boolean = false;
  token = localStorage.getItem('jwt');

  ngOnInit(): void {
    if (!!this.token) this.accountService.updateIsLoggedIn(true);
    this.accountService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      console.log(this.isLoggedIn);
      if (this.accountService.isLoggedIn$.getValue()) {
        this.Account();
      }
    });
  }

  onDeleteComment(id: string) {
    this.contentService.deleteComment(id).then(() => {
      console.log('comment deleted');
      this.submitEvent.emit();
    });
  }

  Account() {
    this.accountService.getAccount(localStorage.getItem('username')).subscribe(
      (response: any) => {
        this.user = response.username;
        localStorage.setItem('idAccount', response.idAccount);
      },
      (error: any) => {
        if (error.status == 401) {
          console.log(error);
        }
      }
    );
  }
  formatDate(date: any) {
    return this.datePipe.transform(date, 'dd.MM.yyyy');
  }
}
