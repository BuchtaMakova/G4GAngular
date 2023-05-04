import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: string = '';
  constructor(private accService: AccountService, private dialog: MatDialog) {}
  loginData = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  onLogin() {
    if (this.loginData.valid) {
      const data = this.loginData.value;
      this.accService.onLogin(data).subscribe((res: string) => {
        localStorage.setItem('jwt', res);
        localStorage.setItem('username', <string>data.username);
        this.accService.updateIsLoggedIn(true);
        console.log(localStorage.getItem('username'));
        console.log('Form Submitted!');
        this.closeDialog();
        this.loginData.reset();
      });
    }
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  protected readonly AccountService = AccountService;
}
