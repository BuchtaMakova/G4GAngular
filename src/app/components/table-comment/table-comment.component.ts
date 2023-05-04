import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-comment',
  templateUrl: './table-comment.component.html',
  styleUrls: ['./table-comment.component.css'],
})
export class TableCommentComponent implements OnInit, AfterViewInit {
  @Input() dataSource: any = [];
  displayedColumns: string[] = ['headline', 'text', 'posted'];

  constructor(private _liveAnnouncer: LiveAnnouncer) {}
  @ViewChild(MatPaginator, { static: false }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort, { static: false }) sort: MatSort | undefined;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.dataSource.sort = this.sort;
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
