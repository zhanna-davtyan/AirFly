package com.airfly.backend.common.service;

public class EntityNotDeletedException extends RuntimeException {

	public EntityNotDeletedException() {
	}

	public EntityNotDeletedException(final String message) {
		super(message);
	}

	public EntityNotDeletedException(final Throwable cause) {
		super(cause);
	}

	public EntityNotDeletedException(final String message, final Throwable cause) {
		super(message, cause);
	}

	public EntityNotDeletedException(final String message, final Throwable cause, final boolean enableSuppression, final boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}
	
}
