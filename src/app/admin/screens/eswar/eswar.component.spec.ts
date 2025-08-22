import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EswarComponent } from './eswar.component';

describe('EswarComponent', () => {
  let component: EswarComponent;
  let fixture: ComponentFixture<EswarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EswarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EswarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
