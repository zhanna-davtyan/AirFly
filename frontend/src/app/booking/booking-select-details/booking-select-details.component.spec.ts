import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSelectDetailsComponent } from './booking-select-details.component';

describe('BookingSelectDetailsComponent', () => {
  let component: BookingSelectDetailsComponent;
  let fixture: ComponentFixture<BookingSelectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingSelectDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingSelectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
