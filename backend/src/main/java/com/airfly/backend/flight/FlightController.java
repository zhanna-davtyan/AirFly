package com.airfly.backend.flight;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        }
        else {
            return ResponseEntity.status(HttpStatus.CREATED).body(flightService.insert(dto));
        }
    }

    @PutMapping("update")
    public ResponseEntity<Flight> update(@RequestBody final Flight dto) {
        if (dto == null) {
            return ResponseEntity.badRequest().build();
        } else {
            if (!flightService.existsById(dto.getId())) {
                return ResponseEntity.notFound().build();
            }
            else {
                return ResponseEntity.status(HttpStatus.OK).body(flightService.update(dto));
            }
        }
    }

}
