package com.airfly.backend.common.rest;

import com.airfly.backend.common.service.*;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class DefaultExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultExceptionHandler.class);

    @ExceptionHandler(Exception.class) // Default for all exceptions without specific binding
    public ResponseEntity<?> handleException(final Exception exception, final HttpServletResponse response) {
        LOGGER.error("Unhandled exception", exception);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @ExceptionHandler(EntityNotFoundException.class) // Thrown by the service if FIND fails
    public ResponseEntity<?> handleEntityNotFoundException(final EntityNotFoundException exception, final HttpServletResponse response) {
        LOGGER.error(exception.getMessage(), exception);
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(EntityNotInsertedException.class) // Thrown by the service if INSERT fails
    public ResponseEntity<?> handleEntityNotInsertedException(final EntityNotInsertedException exception, final HttpServletResponse response) {
        LOGGER.error(exception.getMessage(), exception);
        return ResponseEntity.badRequest().build();
    }

    @ExceptionHandler(EntityNotUpdatedException.class) // Thrown by the service if UPDATE fails
    public ResponseEntity<?> handleEntityNotUpdatedException(final EntityNotUpdatedException exception, final HttpServletResponse response) {
        LOGGER.error(exception.getMessage(), exception);
        return ResponseEntity.badRequest().build();
    }

    @ExceptionHandler(EntityNotDeletedException.class) // Thrown by the service if DELETE fails
    public ResponseEntity<?> handleEntityNotDeletedException(final EntityNotDeletedException exception, final HttpServletResponse response) {
        LOGGER.error(exception.getMessage(), exception);
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(EntityNotCancelledException.class) // Thrown by the service if CANCEL fails
    public ResponseEntity<?> handleEntityNotCancelledException(final EntityNotCancelledException exception, final HttpServletResponse response) {
        LOGGER.error(exception.getMessage(), exception);
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(UnauthorizedException.class) // Thrown by the service if CANCEL fails
    public ResponseEntity<?> handleIllegalAccessException(final UnauthorizedException exception, final HttpServletResponse response) {
        LOGGER.error(exception.getMessage(), exception);
        return ResponseEntity.status(403).build();
    }


    @ExceptionHandler(FlightUnavailableException.class) // Thrown by the service if CANCEL fails
    public ResponseEntity<?> handleFlightUnavailableException(final FlightUnavailableException exception, final HttpServletResponse response) {
        LOGGER.error(exception.getMessage(), exception);
        return ResponseEntity.status(405).build();
    }

}
