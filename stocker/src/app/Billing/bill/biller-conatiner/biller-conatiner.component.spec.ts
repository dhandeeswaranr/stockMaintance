import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillerConatinerComponent } from './biller-conatiner.component';

describe('BillerConatinerComponent', () => {
  let component: BillerConatinerComponent;
  let fixture: ComponentFixture<BillerConatinerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillerConatinerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillerConatinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
