import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSearchContainerComponent } from './flight-search-container.component';

describe('FlightSearchContainerComponent', () => {
  let component: FlightSearchContainerComponent;
  let fixture: ComponentFixture<FlightSearchContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightSearchContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlightSearchContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
