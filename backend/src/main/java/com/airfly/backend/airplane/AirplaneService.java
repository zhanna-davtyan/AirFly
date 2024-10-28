package com.airfly.backend.airplane;


import com.airfly.backend.common.service.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AirplaneService {

    private final AirplaneRepository airplaneRepository;

    public AirplaneService(AirplaneRepository airplaneRepository) {
        this.airplaneRepository = airplaneRepository;
    }

    List<Airplane> getAll(){
        try{
            return airplaneRepository.findAll();
        }
        catch(Exception e){
            throw new EntityNotFoundException("Could not find airplanes");
        }
    }
}
