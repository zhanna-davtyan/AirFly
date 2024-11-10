import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelInsuranceSelectComponent } from './travel-insurance-select.component';

describe('TravelInsuranceSelectComponent', () => {
  let component: TravelInsuranceSelectComponent;
  let fixture: ComponentFixture<TravelInsuranceSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelInsuranceSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TravelInsuranceSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
