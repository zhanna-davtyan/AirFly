package com.airfly.backend.flight;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("flights")
public class FlightController {

    private final FlightService flightService;

    public FlightController(final FlightService flightService) {
        this.flightService = flightService;
    }

    @GetMapping
    public ResponseEntity<List<Flight>> getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(flightService.getAll());
    }

    @PostMapping("insert")
    public ResponseEntity<Flight> insert(@RequestBody final Flight dto) {
        if (dto == null) {
            return ResponseEntity.badRequest().build();
        }
        if (flightService.existsByFlightNumber(dto.getFlightNumber())) {
            return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).build();
        } else {
            return ResponseEntity.status(HttpStatus.CREATED).body(flightService.insert(dto));
        }
    }

    @PutMapping("update")
    public ResponseEntity<Flight> update(@RequestBody final Flight dto) {
        if (dto == null || dto.getBookedSeats() != 0) {
            return ResponseEntity.badRequest().build();
        } else {
            if (!flightService.existsById(dto.getId())) {
                return ResponseEntity.notFound().build();
            }
            Optional<Flight> flight = flightService.getByFlightNumber(dto.getFlightNumber());
            if (flight.isPresent() && flight.get().getId() != dto.getId()) {
                return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).build();
            } else {
                return ResponseEntity.status(HttpStatus.OK).body(flightService.update(dto));
            }
        }
    }

    @DeleteMapping(value = "delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") final long id) {
        if (!flightService.existsById(id)) {
            return ResponseEntity.notFound().build();
        } else {
            flightService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
    }

    @PostMapping("get-by-flight-search")
    public ResponseEntity<List<Flight>> getByFlightSearch(@RequestBody final FlightSearch dto) {
        if (dto == null) {
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.status(HttpStatus.CREATED).body(flightService.getFlightByFlightSearch(dto));
        }
    }

    @PostMapping("get-by-flight-search-with-date")
    public ResponseEntity<List<Flight>> getByFlightSearch(@RequestBody final FlightSearchWithDate dto) {
        if (dto == null) {
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.status(HttpStatus.CREATED).body(flightService.getFlightByFlightSearchWithDate(dto));
        }
    }

}
