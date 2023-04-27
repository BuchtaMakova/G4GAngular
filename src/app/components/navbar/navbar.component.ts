import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public user: any;
  constructor(
    public dialog: MatDialog,
    public accountService: AccountService
  ) {}

  token = localStorage.getItem('jwt');
  isLoggedIn: boolean = false;
  logInOut: boolean = false;
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

  openDialog() {
    this.dialog.open(LoginComponent, { autoFocus: false, height: '300px' });
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

  logOut() {
    this.accountService.logOut();
  }

  protected readonly localStorage = localStorage;
}
