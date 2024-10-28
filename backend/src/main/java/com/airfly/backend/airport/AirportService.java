package com.airfly.backend.airport;


import com.airfly.backend.common.service.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AirportService {

    private final AirportRepository airportRepository;

    public AirportService(AirportRepository airportRepository) {
        this.airportRepository = airportRepository;
    }

    public List<Airport> getAll() {
        try {
            return airportRepository.findAll();
        }
        catch (Exception e) {
            throw new EntityNotFoundException("Could not find airports");
        }
    }
}
