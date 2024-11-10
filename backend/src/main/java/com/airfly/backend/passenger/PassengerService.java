package com.airfly.backend.passenger;


import com.airfly.backend.common.service.EntityNotInsertedException;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.List;

@Service
public class PassengerService {

    private final PassengerRepository passengerRepository;

    public PassengerService(PassengerRepository passengerRepository) {
        this.passengerRepository = passengerRepository;
    }

    public void checkPassengerValidity(List<Passenger> passengers) {
        for (Passenger passenger : passengers) {
            String type = passenger.getType();
            Timestamp dateOfBirth = passenger.getDateOfBirth();

            if (dateOfBirth != null) {
                int age = calculateAge(dateOfBirth);

                if ("adult".equalsIgnoreCase(type) && age < 12) {
                    throw new IllegalArgumentException("Passenger should be an adult (age 12+) but is " + age + " years old.");
                } else if ("child".equalsIgnoreCase(type) && (age < 2 || age > 11)) {
                    throw new IllegalArgumentException("Passenger should be a child (age 2-11) but is " + age + " years old.");
                } else if ("baby".equalsIgnoreCase(type) && (age < 0 || age > 1)) {
                    throw new IllegalArgumentException("Passenger should be a baby (age 0-1) but is " + age + " years old.");
                }
            }
        }
    }

    private int calculateAge(Timestamp dateOfBirth) {
        LocalDate dob = dateOfBirth.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate today = LocalDate.now();
        return Period.between(dob, today).getYears();
    }

    public List<Passenger> insert(final List<Passenger> passengers) {
        try {
            return passengerRepository.saveAll(passengers);
        } catch (Exception e) {
            throw new EntityNotInsertedException("Could not insert passengers", e);
        }
    }
}
