import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatishComponent } from './satish.component';

describe('SatishComponent', () => {
  let component: SatishComponent;
  let fixture: ComponentFixture<SatishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SatishComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SatishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
