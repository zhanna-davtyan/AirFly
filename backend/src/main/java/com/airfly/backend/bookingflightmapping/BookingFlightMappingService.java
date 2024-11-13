package com.airfly.backend.bookingflightmapping;


import com.airfly.backend.common.service.EntityNotInsertedException;
import org.springframework.stereotype.Service;


@Service
public class BookingFlightMappingService {

    private final BookingFlightMappingRepository bookingFlightMappingRepository;

    public BookingFlightMappingService(BookingFlightMappingRepository bookingFlightMappingRepository) {
        this.bookingFlightMappingRepository = bookingFlightMappingRepository;
    }

    public BookingFlightMapping insert(final BookingFlightMapping bookingFlightMapping) {
        try {
            return bookingFlightMappingRepository.save(bookingFlightMapping);
        } catch (Exception e) {
            throw new EntityNotInsertedException("Could not insert bookingFlightMapping", e);
        }
    }
}
