import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AadhaarComponent } from './aadhar.component';

describe('AadharComponent', () => {
  let component: AadhaarComponent;
  let fixture: ComponentFixture<AadhaarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AadhaarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AadhaarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
