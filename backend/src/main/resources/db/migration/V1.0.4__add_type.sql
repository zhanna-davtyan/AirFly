ALTER TABLE `${flyway:defaultSchema}`.booking_flight_mappings
    ADD COLUMN type varchar(255) NOT NULL;
