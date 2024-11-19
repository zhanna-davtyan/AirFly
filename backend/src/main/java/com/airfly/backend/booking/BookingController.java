package com.airfly.backend.booking;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("{id}")
    public ResponseEntity<Booking> getById(@PathVariable("id") final long id) {
        return ResponseEntity.status(HttpStatus.OK).body(bookingService.getById(id));
    }

    @GetMapping("get-all-by-user")
    public ResponseEntity<List<Booking>> getAllByUser() {
        return ResponseEntity.status(HttpStatus.OK).body(bookingService.getAllByUser());
    }

    @GetMapping("")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<List<Booking>> getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(bookingService.getAll());
    }
}
