package com.airfly.backend.flight;


import com.airfly.backend.common.service.EntityNotFoundException;
import com.airfly.backend.common.service.EntityNotInsertedException;
import com.airfly.backend.common.service.EntityNotUpdatedException;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@Service
public class FlightService {

    private final FlightRepository flightRepository;

    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    List<Flight> getAll() {
        try {
            return flightRepository.findAll();
        } catch (Exception e) {
            throw new EntityNotFoundException("Could not find flights", e);
        }
    }

    Boolean existsByFlightNumber(String flightNumber) {
        return flightRepository.existsByFlightNumber(flightNumber);
    }

    Boolean existsById(final long id) {
        return flightRepository.existsById(id);
    }

    Flight insert(final Flight flight) {
        try {
            return flightRepository.save(flight);
        } catch (Exception e) {
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

    Optional<Flight> getByFlightNumber(String flightNumber) {
        return flightRepository.findByFlightNumber(flightNumber);
    }

    void deleteById(long id) {
        flightRepository.deleteById(id);
    }


    List<Flight> getByOutwardFlightSearch(OutwardFlightSearch dto) {
        try {
            Timestamp startDate = new Timestamp(System.currentTimeMillis());
            Calendar calendar = Calendar.getInstance();
            calendar.setTimeInMillis(startDate.getTime());
            calendar.add(Calendar.DAY_OF_MONTH, 60);
            Timestamp endDate = new Timestamp(calendar.getTimeInMillis());
            return flightRepository.findByFlightSearch(
                    dto.departureAirportId,
                    dto.arrivalAirportId,
                    startDate,
                    endDate,
                    dto.numberOfPassengers
            );
        } catch (Exception e) {
            throw new EntityNotFoundException("Could not find flights", e);
        }
    }

    List<Flight> getByReturnFlightSearch(ReturnFlightSearch dto) {
        try {
            Calendar calendar = Calendar.getInstance();
            calendar.setTimeInMillis(dto.getMinDepartureTime().getTime());
            calendar.add(Calendar.DAY_OF_MONTH, 1);
            Timestamp minDeparturePlusOneDay = new Timestamp(calendar.getTimeInMillis());

            Calendar calendar2 = Calendar.getInstance();
            calendar2.setTimeInMillis(dto.getMinDepartureTime().getTime());
            calendar2.add(Calendar.DAY_OF_MONTH, 60);
            Timestamp endDate = new Timestamp(calendar2.getTimeInMillis());
            return flightRepository.findByFlightSearch(
                    dto.departureAirportId,
                    dto.arrivalAirportId,
                    minDeparturePlusOneDay,
                    endDate,
                    dto.numberOfPassengers
            );
        } catch (Exception e) {
            throw new EntityNotFoundException("Could not find flights", e);
        }
    }

    List<Flight> getByFlightSearchWithDate(FlightSearchWithDate flightSearchWithDate) {
        try {
            Timestamp departureTime = flightSearchWithDate.getDepartureTime();
            Calendar calendar = Calendar.getInstance();
            calendar.setTimeInMillis(departureTime.getTime());

            Timestamp startDate;
            Timestamp endDate;

            Calendar today = Calendar.getInstance();
            boolean isToday = (calendar.get(Calendar.YEAR) == today.get(Calendar.YEAR)) &&
                    (calendar.get(Calendar.DAY_OF_YEAR) == today.get(Calendar.DAY_OF_YEAR));

            if (isToday) {
                startDate = new Timestamp(System.currentTimeMillis());
            } else {
                calendar.set(Calendar.HOUR_OF_DAY, 0);
                calendar.set(Calendar.MINUTE, 0);
                calendar.set(Calendar.SECOND, 0);
                calendar.set(Calendar.MILLISECOND, 0);
                startDate = new Timestamp(calendar.getTimeInMillis());
            }

            calendar.setTimeInMillis(departureTime.getTime());
            calendar.set(Calendar.HOUR_OF_DAY, 23);
            calendar.set(Calendar.MINUTE, 59);
            calendar.set(Calendar.SECOND, 59);
            endDate = new Timestamp(calendar.getTimeInMillis());

            return flightRepository.findByFlightSearch(
                    flightSearchWithDate.getDepartureAirportId(),
                    flightSearchWithDate.getArrivalAirportId(),
                    startDate,
                    endDate,
                    flightSearchWithDate.getNumberOfPassengers()
            );
        }
        catch (Exception e){
            throw new EntityNotFoundException("Could not find flights", e);
        }
    }

}
