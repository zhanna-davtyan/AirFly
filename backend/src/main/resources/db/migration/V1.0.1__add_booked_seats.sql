ALTER TABLE `${flyway:defaultSchema}`.flights
    ADD COLUMN booked_seats bigint NOT NULL DEFAULT 0;
