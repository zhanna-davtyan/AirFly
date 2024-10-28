package com.airfly.backend.flight;


import com.airfly.backend.common.service.EntityNotFoundException;
import com.airfly.backend.common.service.EntityNotInsertedException;
import com.airfly.backend.common.service.EntityNotUpdatedException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightService {

    private final FlightRepository flightRepository;

    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    List<Flight> getAll(){
        try {
            return flightRepository.findAll();
        }
        catch (Exception e) {
            throw new EntityNotFoundException("Could not find flights", e);
        }
    }

    Boolean existsByFlightNumber(String flightNumber){
        return flightRepository.existsByFlightNumber(flightNumber);
    }

    Boolean existsById(final long id) {
        return flightRepository.existsById(id);
    }

    Flight insert(final Flight flight) {
        try {
            return flightRepository.save(flight);
        }
        catch (Exception e) {
            throw new EntityNotInsertedException("Could not insert flight", e);
        }
    }

    Flight update(final Flight flight) {
        try {
            return flightRepository.save(flight);
        } catch (Exception e) {
            throw new EntityNotUpdatedException("Could not update flight", e);
        }
    }

}
