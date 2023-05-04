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
  selector: 'app-table-content',
  templateUrl: './table-content.component.html',
  styleUrls: ['./table-content.component.css'],
})
export class TableContentComponent implements AfterViewInit, OnInit {
  @Input() dataSource: any = [];

  displayedColumns: string[] = ['text', 'posted'];

  constructor(private _liveAnnouncer: LiveAnnouncer) {}
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  lengthTable: any;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.dataSource);
  }

  ngAfterViewInit() {
    console.log(this.dataSource);
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
