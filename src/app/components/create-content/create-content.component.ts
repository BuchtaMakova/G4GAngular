import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.css'],
})
export class CreateContentComponent {
  createContent = new FormGroup({
    headline: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
  });

  displayElement = false;

  onSubmit() {
    if (this.createContent.valid) {
      console.log('Form Submitted!');
      this.displayElement = false;
      this.createContent.reset();
    }
  }
}
