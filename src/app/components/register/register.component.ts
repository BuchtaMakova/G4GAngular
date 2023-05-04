import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: string = '';
  showAge: any;
  constructor(
    private accService: AccountService,
    private dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  loginData = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    password2: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
  });

  onRegister() {
    if (
      this.loginData.valid &&
      this.loginData.value.password == this.loginData.value.password
    ) {
      this.ageCalculator();
      if (this.showAge >= 18) {
        const data = this.loginData.value;
        this.accService.register(data).subscribe((res: string) => {
          localStorage.setItem('jwt', res);
          localStorage.setItem('username', <string>data.username);
          this.accService.updateIsLoggedIn(true);
          console.log(localStorage.getItem('username'));
          console.log('Form Submitted!');
          this.loginData.reset();
          this.router.navigateByUrl('');
        });
      } else {
        this._snackBar.open('You must be at least 18 years old', 'close');
      }
    }
  }

  ageCalculator() {
    if (this.loginData.value.birthDate) {
      const convertAge = new Date(this.loginData.value.birthDate);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
      console.log(this.showAge);
    }
  }

  protected readonly AccountService = AccountService;
}
