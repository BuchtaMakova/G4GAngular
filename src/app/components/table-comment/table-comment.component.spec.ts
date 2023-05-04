import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCommentComponent } from './table-comment.component';

describe('TableCommentComponent', () => {
  let component: TableCommentComponent;
  let fixture: ComponentFixture<TableCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
