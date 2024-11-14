package com.airfly.backend.common.service;

public class FlightUnavailableException extends RuntimeException {
    public FlightUnavailableException() {
    }

    public FlightUnavailableException(final String message) {
        super(message);
    }

    public FlightUnavailableException(final Throwable cause) {
        super(cause);
    }

    public FlightUnavailableException(final String message, final Throwable cause) {
        super(message, cause);
    }

    public FlightUnavailableException(final String message, final Throwable cause, final boolean enableSuppression, final boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}