import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDialogComponent } from './bill-dialog.component';

describe('BillDialogComponent', () => {
  let component: BillDialogComponent;
  let fixture: ComponentFixture<BillDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
