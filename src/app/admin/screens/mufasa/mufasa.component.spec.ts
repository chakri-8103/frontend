import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MufasaComponent } from './mufasa.component';

describe('MufasaComponent', () => {
  let component: MufasaComponent;
  let fixture: ComponentFixture<MufasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MufasaComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(MufasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();  
  });
});