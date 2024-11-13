ALTER TABLE `${flyway:defaultSchema}`.bookings
    ADD COLUMN billing_firstname VARCHAR(255) NOT NULL,
    ADD COLUMN billing_lastname VARCHAR(255) NOT NULL,
    ADD COLUMN billing_postcode VARCHAR(255) NOT NULL,
    ADD COLUMN billing_city VARCHAR(255) NOT NULL,
    ADD COLUMN billing_street VARCHAR(255) NOT NULL,
    ADD COLUMN billing_housenumber VARCHAR(255) NOT NULL;