import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private accountService: AccountService, private router: Router) {}
  user: any;
  isLoggedIn: boolean = false;
  ngOnInit(): void {
    this.accountService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      console.log(this.isLoggedIn);
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
        console.log(response);
      },
      (error: any) => {
        if (error.status == 401) {
          console.log(error);
        }
      }
    );
  }
}
