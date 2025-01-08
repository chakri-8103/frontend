import { ComponentFixture, TestBed } from '@angular/core/testing';

import { billsComponent } from './bills.component';

describe('BillsComponent', () => {
  let component: billsComponent;
  let fixture: ComponentFixture<billsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ billsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(billsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
