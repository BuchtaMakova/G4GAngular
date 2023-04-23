import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.css'],
})
export class CreateContentComponent implements OnInit {
  createContent = new FormGroup({
    headline: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
  });

  constructor(private accountService: AccountService) {}

  isLoggedIn: boolean = false;

  displayElement = false;

  ngOnInit() {
    this.accountService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      console.log(this.isLoggedIn);
    });
  }
  onSubmit() {
    if (this.createContent.valid) {
      console.log('Form Submitted!');
      this.displayElement = false;
      this.createContent.reset();
    }
  }
}
