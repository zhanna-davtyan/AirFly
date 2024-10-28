package com.airfly.backend.common.service;

public class EntityNotUpdatedException extends RuntimeException {

	public EntityNotUpdatedException() {
	}

	public EntityNotUpdatedException(final String message) {
		super(message);
	}

	public EntityNotUpdatedException(final Throwable cause) {
		super(cause);
	}

	public EntityNotUpdatedException(final String message, final Throwable cause) {
		super(message, cause);
	}

	public EntityNotUpdatedException(final String message, final Throwable cause, final boolean enableSuppression, final boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}
	
}
