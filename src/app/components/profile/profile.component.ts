import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private accountService: AccountService, private router: Router) {}
  user: any;
  comments: any = [];
  contents: any = [];
  isLoggedIn: boolean = false;
  dataSource: any = [];
  dataSourceContent: any = [];
  length: number = 0;
  ngOnInit(): void {
    this.accountService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (this.accountService.isLoggedIn$.getValue()) {
        this.getAccount();
      } else {
        this.router.navigateByUrl('');
      }
    });
  }

  getAccount() {
    this.accountService.getAccount(localStorage.getItem('username')).subscribe(
      (response: any) => {
        this.user = response;
        this.comments = new MatTableDataSource(response.comments);
        this.contents = response.contents;
        this.dataSource = new MatTableDataSource(this.contents);
      },
      (error: any) => {
        if (error.status == 401) {
          console.log(error);
        }
      }
    );
  }
}
