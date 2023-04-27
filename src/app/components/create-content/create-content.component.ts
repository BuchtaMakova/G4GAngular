import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ContentService } from '../../services/content.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.css'],
})
export class CreateContentComponent implements OnInit {
  @Input() idSubcategory = '';

  createContent = new FormGroup({
    headline: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
  });

  username: any;

  constructor(
    private accountService: AccountService,
    private contentService: ContentService
  ) {}

  isLoggedIn: boolean = false;

  displayElement = false;

  myDate = new Date();

  currentDate() {}

  account: any = null;
  ngOnInit() {
    this.accountService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      console.log(this.isLoggedIn);
      if (isLoggedIn) {
        this.username = localStorage.getItem('username');
        this.accountService.getAccount(this.username).subscribe((account) => {
          this.account = account.idAccount;
        });
      }
    });
  }

  contentInfo: any;

  onSubmit() {
    if (this.createContent.valid) {
      this.contentInfo = {
        headline: this.createContent.value.headline,
        text: this.createContent.value.text,
        posted:
          formatDate(new Date(), 'yyyy-MM-dd', 'en-US', 'Europe/Prague') +
          'T' +
          formatDate(new Date(), 'HH:mm:ss', 'en-US', 'Europe/Prague'),
        accountIdAccount: this.account,
        subcategoryIdSubcategory: Number(this.idSubcategory),
      };
      this.contentService.createContent(this.contentInfo);
      console.log('Createcontent form');
      this.displayElement = false;
      this.createContent.reset();
    }
  }
}
