-- Create the schema
CREATE SCHEMA IF NOT EXISTS `${flyway:defaultSchema}`;

-- Table: users
CREATE TABLE IF NOT EXISTS `${flyway:defaultSchema}`.users
(
    id               bigint                   NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email            varchar(255)             NOT NULL,
    password         varchar(255)             NOT NULL,
    first_name       varchar(255)             NOT NULL,
    last_name        varchar(255)             NOT NULL,
    role             varchar(255)             NOT NULL DEFAULT 'USER'
    );

-- Indexes
CREATE INDEX idx_email_id_on_users
    ON `${flyway:defaultSchema}`.users (email);

-- Unique constraints
ALTER TABLE `${flyway:defaultSchema}`.users
    ADD CONSTRAINT user_email_unique_on_users UNIQUE (email);

-- Table: categories
CREATE TABLE IF NOT EXISTS `${flyway:defaultSchema}`.categories
(
    id                 bigint                   NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name               varchar(255)             NOT NULL,
    price              decimal(10, 2)           NOT NULL
    );

-- Unique constraints
ALTER TABLE `${flyway:defaultSchema}`.categories
    ADD CONSTRAINT name_unique_on_categories UNIQUE (name);

-- Table: airplanes
CREATE TABLE IF NOT EXISTS `${flyway:defaultSchema}`.airplanes
(
    id               bigint                   NOT NULL PRIMARY KEY AUTO_INCREMENT,
    model            varchar(255)             NOT NULL,
    capacity         bigint                   NOT NULL
    );


-- Table: airports
CREATE TABLE IF NOT EXISTS `${flyway:defaultSchema}`.airports
(
    id                        bigint                   NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name                      varchar(255)             NOT NULL,
    country                   varchar(255)             NOT NULL,
    city                      varchar(255)             NOT NULL,
    code                      varchar(255)             NOT NULL
    );

-- Unique constraints
ALTER TABLE `${flyway:defaultSchema}`.airports
    ADD CONSTRAINT name_unique_on_airports UNIQUE (name);

ALTER TABLE `${flyway:defaultSchema}`.airports
    ADD CONSTRAINT code_unique_on_airports UNIQUE (code);



-- Table: flights
CREATE TABLE IF NOT EXISTS `${flyway:defaultSchema}`.flights
(
    id                      bigint                   NOT NULL PRIMARY KEY AUTO_INCREMENT,
    flight_number           varchar(255)             NOT NULL,
    departure_airport_id    bigint                   NOT NULL,
    arrival_airport_id      bigint                   NOT NULL,
    airplane_id             bigint                   NOT NULL,
    departure_time          timestamp                NOT NULL,
    arrival_time            timestamp                NOT NULL,
    price                   decimal(10, 2)           NOT NULL,
    FOREIGN KEY (departure_airport_id) REFERENCES `${flyway:defaultSchema}`.airports (id) ON DELETE CASCADE,
    FOREIGN KEY (arrival_airport_id) REFERENCES `${flyway:defaultSchema}`.airports (id) ON DELETE CASCADE,
    FOREIGN KEY (airplane_id) REFERENCES `${flyway:defaultSchema}`.airplanes (id) ON DELETE CASCADE
    );

-- Indexes
CREATE INDEX idx_foreign_key_arrival_airport_id_on_flights
    ON `${flyway:defaultSchema}`.flights (arrival_airport_id);

CREATE INDEX idx_foreign_key_departure_airport_id_on_flights
    ON `${flyway:defaultSchema}`.flights (departure_airport_id);

CREATE INDEX idx_foreign_key_airplane_id_on_flights
    ON `${flyway:defaultSchema}`.flights (airplane_id);

-- Unique constraints
ALTER TABLE `${flyway:defaultSchema}`.flights
    ADD CONSTRAINT flight_number_unique_on_flights UNIQUE (flight_number);



-- Table: bookings
CREATE TABLE IF NOT EXISTS `${flyway:defaultSchema}`.bookings
(
    id                        bigint                   NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id                   bigint                   NOT NULL,
    total_price               decimal(10, 2)           NOT NULL,
    category_id               bigint                   NOT NULL,
    travel_insurance          boolean                  NOT NULL,
    FOREIGN KEY (user_id) REFERENCES `${flyway:defaultSchema}`.users (id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES `${flyway:defaultSchema}`.categories (id) ON DELETE CASCADE
    );

-- Indexes
CREATE INDEX idx_foreign_key_user_id_on_bookings
    ON `${flyway:defaultSchema}`.bookings (user_id);

CREATE INDEX idx_foreign_key_category_id_on_bookings
    ON `${flyway:defaultSchema}`.bookings (category_id);



-- Table: booking_flight_mappings
CREATE TABLE IF NOT EXISTS `${flyway:defaultSchema}`.booking_flight_mappings
(
    id            bigint                   NOT NULL PRIMARY KEY AUTO_INCREMENT,
    booking_id    bigint                   NOT NULL,
    flight_id     bigint                   NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES `${flyway:defaultSchema}`.bookings (id) ON DELETE CASCADE,
    FOREIGN KEY (flight_id) REFERENCES `${flyway:defaultSchema}`.flights (id) ON DELETE CASCADE
    );

-- Indexes
CREATE INDEX idx_foreign_key_booking_id_on_booking_flights
    ON `${flyway:defaultSchema}`.booking_flight_mappings (booking_id);

CREATE INDEX idx_foreign_key_flight_id_on_booking_flights
    ON `${flyway:defaultSchema}`.booking_flight_mappings (flight_id);



-- Table: passengers
CREATE TABLE IF NOT EXISTS `${flyway:defaultSchema}`.passengers
(
    id                        bigint                   NOT NULL PRIMARY KEY AUTO_INCREMENT,
    booking_id                bigint                   NOT NULL,
    first_name                varchar(255)             NOT NULL,
    last_name                 varchar(255)             NOT NULL,
    date_of_birth             timestamp                NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES `${flyway:defaultSchema}`.bookings (id) ON DELETE CASCADE
    );

-- Indexes
CREATE INDEX idx_foreign_key_booking_id_on_passengers
    ON `${flyway:defaultSchema}`.passengers (booking_id);


