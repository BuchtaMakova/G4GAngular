import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private accService: AccountService) {}
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
        console.log(localStorage.getItem('username'));
        console.log('Form Submitted!');
        this.loginData.reset();
      });
    }
  }

  Account() {}

  protected readonly AccountService = AccountService;
}
