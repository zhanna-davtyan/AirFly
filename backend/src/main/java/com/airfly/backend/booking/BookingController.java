package com.airfly.backend.booking;


import com.airfly.backend.flight.Flight;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("submit-order")
    public ResponseEntity<Long> submitOrder(@RequestBody final BookingForInsert dto) {
        if (dto == null) {
            return ResponseEntity.badRequest().build();
        }
        else {
            return ResponseEntity.status(HttpStatus.CREATED).body(bookingService.submitOrder(dto));
        }
    }
}
