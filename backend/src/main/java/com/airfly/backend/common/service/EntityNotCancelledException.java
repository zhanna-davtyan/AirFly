package com.airfly.backend.common.service;

public class EntityNotCancelledException extends RuntimeException {

    public EntityNotCancelledException() {
    }

    public EntityNotCancelledException(final String message) {
        super(message);
    }

    public EntityNotCancelledException(final Throwable cause) {
        super(cause);
    }

    public EntityNotCancelledException(final String message, final Throwable cause) {
        super(message, cause);
    }

    public EntityNotCancelledException(final String message, final Throwable cause, final boolean enableSuppression, final boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

}
