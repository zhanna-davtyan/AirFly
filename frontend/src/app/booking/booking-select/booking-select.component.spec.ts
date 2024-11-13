import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSelectComponent } from './booking-select.component';

describe('BookingSelectComponent', () => {
  let component: BookingSelectComponent;
  let fixture: ComponentFixture<BookingSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
