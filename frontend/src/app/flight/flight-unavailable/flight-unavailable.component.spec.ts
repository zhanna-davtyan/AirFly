import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightUnavailableComponent } from './flight-unavailable.component';

describe('FlightUnavailableComponent', () => {
  let component: FlightUnavailableComponent;
  let fixture: ComponentFixture<FlightUnavailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightUnavailableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlightUnavailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
