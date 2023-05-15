import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {
  @Input() comments: any[] = [];

  constructor(private datePipe: DatePipe) {}
  formatDate(date: any) {
    return this.datePipe.transform(date, 'dd.MM.yyyy');
  }
}
