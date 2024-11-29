INSERT INTO airfly_local.users (email, password, first_name, last_name, role) VALUES
                                                                  ('max.mustermann@test.com', '12345', 'Max', 'Mustermann', 'USER'),
                                                                  ('fabian.schwarz@test.com', '12345', 'Fabian', 'Schwarz', 'USER'),
                                                                  ('birgitt.naumann@test.com', '12345', 'Birgitt', 'Naumann', 'USER'),
                                                                  ('robert.fischer@test.com', '12345', 'Robert', 'Fischer', 'USER');



-- SQL script for generating flights for the next week
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001001', 1, 2, 5, '2024-12-02 16:00:00', '2024-12-02 18:30:00', 127.95, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001002', 1, 2, 2, '2024-12-02 16:00:00', '2024-12-02 18:30:00', 160.42, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001003', 1, 3, 7, '2024-12-02 16:00:00', '2024-12-02 18:30:00', 174.66, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001004', 2, 1, 9, '2024-12-02 08:00:00', '2024-12-02 10:30:00', 101.84, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001005', 2, 3, 7, '2024-12-02 12:00:00', '2024-12-02 14:30:00', 132.92, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001006', 2, 3, 2, '2024-12-02 08:00:00', '2024-12-02 10:30:00', 122.98, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001007', 2, 3, 7, '2024-12-02 08:00:00', '2024-12-02 10:30:00', 182.31, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001008', 3, 1, 3, '2024-12-02 20:00:00', '2024-12-02 22:30:00', 116.56, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001009', 3, 1, 4, '2024-12-02 20:00:00', '2024-12-02 22:30:00', 169.9, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001010', 3, 1, 8, '2024-12-02 20:00:00', '2024-12-02 22:30:00', 175.84, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001011', 3, 2, 6, '2024-12-02 08:00:00', '2024-12-02 10:30:00', 118.27, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001012', 3, 2, 5, '2024-12-02 12:00:00', '2024-12-02 14:30:00', 184.0, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001013', 1, 2, 6, '2024-12-03 20:00:00', '2024-12-03 22:30:00', 136.37, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001014', 1, 3, 8, '2024-12-03 12:00:00', '2024-12-03 14:30:00', 149.16, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001015', 1, 3, 5, '2024-12-03 08:00:00', '2024-12-03 10:30:00', 170.32, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001016', 1, 3, 2, '2024-12-03 16:00:00', '2024-12-03 18:30:00', 183.12, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001017', 2, 1, 7, '2024-12-03 08:00:00', '2024-12-03 10:30:00', 125.26, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001018', 2, 1, 9, '2024-12-03 12:00:00', '2024-12-03 14:30:00', 198.96, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001019', 2, 1, 4, '2024-12-03 16:00:00', '2024-12-03 18:30:00', 180.7, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001020', 2, 3, 9, '2024-12-03 16:00:00', '2024-12-03 18:30:00', 145.67, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001021', 3, 1, 4, '2024-12-03 16:00:00', '2024-12-03 18:30:00', 194.27, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001022', 3, 1, 3, '2024-12-03 08:00:00', '2024-12-03 10:30:00', 129.18, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001023', 3, 2, 6, '2024-12-03 12:00:00', '2024-12-03 14:30:00', 115.45, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001024', 3, 2, 7, '2024-12-03 20:00:00', '2024-12-03 22:30:00', 112.35, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001025', 1, 2, 1, '2024-12-04 16:00:00', '2024-12-04 18:30:00', 111.79, 188);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001026', 1, 2, 7, '2024-12-04 08:00:00', '2024-12-04 10:30:00', 185.8, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001027', 1, 2, 5, '2024-12-04 08:00:00', '2024-12-04 10:30:00', 121.24, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001028', 1, 3, 5, '2024-12-04 20:00:00', '2024-12-04 22:30:00', 130.5, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001029', 1, 3, 3, '2024-12-04 08:00:00', '2024-12-04 10:30:00', 124.0, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001030', 1, 3, 2, '2024-12-04 08:00:00', '2024-12-04 10:30:00', 123.29, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001031', 2, 1, 6, '2024-12-04 12:00:00', '2024-12-04 14:30:00', 149.19, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001032', 2, 1, 8, '2024-12-04 16:00:00', '2024-12-04 18:30:00', 146.7, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001033', 2, 1, 6, '2024-12-04 16:00:00', '2024-12-04 18:30:00', 198.05, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001034', 2, 3, 7, '2024-12-04 08:00:00', '2024-12-04 10:30:00', 167.87, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001035', 3, 1, 3, '2024-12-04 12:00:00', '2024-12-04 14:30:00', 162.3, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001036', 3, 1, 6, '2024-12-04 08:00:00', '2024-12-04 10:30:00', 136.7, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001037', 3, 1, 9, '2024-12-04 12:00:00', '2024-12-04 14:30:00', 127.76, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001038', 3, 2, 4, '2024-12-04 08:00:00', '2024-12-04 10:30:00', 106.65, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001039', 1, 2, 8, '2024-12-05 16:00:00', '2024-12-05 18:30:00', 106.84, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001040', 1, 3, 5, '2024-12-05 12:00:00', '2024-12-05 14:30:00', 137.6, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001041', 2, 1, 4, '2024-12-05 08:00:00', '2024-12-05 10:30:00', 138.09, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001042', 2, 1, 6, '2024-12-05 12:00:00', '2024-12-05 14:30:00', 184.28, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001043', 2, 1, 2, '2024-12-05 16:00:00', '2024-12-05 18:30:00', 111.6, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001044', 2, 3, 4, '2024-12-05 08:00:00', '2024-12-05 10:30:00', 167.48, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001045', 2, 3, 5, '2024-12-05 16:00:00', '2024-12-05 18:30:00', 172.01, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001046', 2, 3, 3, '2024-12-05 16:00:00', '2024-12-05 18:30:00', 130.76, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001047', 3, 1, 1, '2024-12-05 20:00:00', '2024-12-05 22:30:00', 196.42, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001048', 3, 2, 3, '2024-12-05 20:00:00', '2024-12-05 22:30:00', 176.17, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001049', 3, 2, 6, '2024-12-05 20:00:00', '2024-12-05 22:30:00', 185.22, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001050', 1, 2, 4, '2024-12-06 16:00:00', '2024-12-06 18:30:00', 102.7, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001051', 1, 2, 3, '2024-12-06 08:00:00', '2024-12-06 10:30:00', 169.08, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001052', 1, 2, 1, '2024-12-06 08:00:00', '2024-12-06 10:30:00', 197.68, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001053', 1, 3, 9, '2024-12-06 08:00:00', '2024-12-06 10:30:00', 188.59, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001054', 1, 3, 2, '2024-12-06 16:00:00', '2024-12-06 18:30:00', 179.88, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001055', 2, 1, 1, '2024-12-06 12:00:00', '2024-12-06 14:30:00', 116.57, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001056', 2, 3, 7, '2024-12-06 12:00:00', '2024-12-06 14:30:00', 190.29, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001057', 3, 1, 7, '2024-12-06 12:00:00', '2024-12-06 14:30:00', 165.33, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001058', 3, 1, 1, '2024-12-06 12:00:00', '2024-12-06 14:30:00', 196.88, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001059', 3, 2, 9, '2024-12-06 20:00:00', '2024-12-06 22:30:00', 101.14, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001060', 3, 2, 6, '2024-12-06 16:00:00', '2024-12-06 18:30:00', 117.62, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001061', 1, 2, 9, '2024-12-07 12:00:00', '2024-12-07 14:30:00', 143.13, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001062', 1, 3, 8, '2024-12-07 16:00:00', '2024-12-07 18:30:00', 194.72, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001063', 1, 3, 8, '2024-12-07 12:00:00', '2024-12-07 14:30:00', 163.95, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001064', 1, 3, 7, '2024-12-07 20:00:00', '2024-12-07 22:30:00', 148.15, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001065', 2, 1, 3, '2024-12-07 16:00:00', '2024-12-07 18:30:00', 192.27, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001066', 2, 3, 2, '2024-12-07 08:00:00', '2024-12-07 10:30:00', 113.98, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001067', 2, 3, 3, '2024-12-07 12:00:00', '2024-12-07 14:30:00', 114.85, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001068', 2, 3, 2, '2024-12-07 20:00:00', '2024-12-07 22:30:00', 185.7, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001069', 3, 1, 2, '2024-12-07 08:00:00', '2024-12-07 10:30:00', 124.93, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001070', 3, 2, 8, '2024-12-07 16:00:00', '2024-12-07 18:30:00', 103.24, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001071', 3, 2, 2, '2024-12-07 16:00:00', '2024-12-07 18:30:00', 120.1, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001072', 3, 2, 8, '2024-12-07 20:00:00', '2024-12-07 22:30:00', 171.24, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001073', 1, 2, 6, '2024-12-08 12:00:00', '2024-12-08 14:30:00', 168.93, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001074', 1, 2, 8, '2024-12-08 12:00:00', '2024-12-08 14:30:00', 162.54, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001075', 1, 2, 2, '2024-12-08 16:00:00', '2024-12-08 18:30:00', 121.17, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001076', 1, 3, 7, '2024-12-08 20:00:00', '2024-12-08 22:30:00', 130.22, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001077', 2, 1, 5, '2024-12-08 16:00:00', '2024-12-08 18:30:00', 136.29, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001078', 2, 3, 8, '2024-12-08 20:00:00', '2024-12-08 22:30:00', 145.65, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001079', 3, 1, 9, '2024-12-08 20:00:00', '2024-12-08 22:30:00', 159.8, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001080', 3, 1, 1, '2024-12-08 20:00:00', '2024-12-08 22:30:00', 112.61, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001081', 3, 1, 2, '2024-12-08 16:00:00', '2024-12-08 18:30:00', 193.88, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001082', 3, 2, 8, '2024-12-08 16:00:00', '2024-12-08 18:30:00', 198.25, 0);
INSERT INTO airfly_local.flights (flight_number, departure_airport_id, arrival_airport_id, airplane_id, departure_time, arrival_time, price, booked_seats) VALUES ('001083', 3, 2, 2, '2024-12-08 20:00:00', '2024-12-08 22:30:00', 102.98, 0);


INSERT INTO bookings (billing_city, billing_firstname, billing_housenumber, billing_lastname, billing_postcode, billing_street, total_price, travel_insurance, user_id) VALUES
                                                                                                                                                                            ('Berlin', 'Max', '12A', 'Müller', '10115', 'Friedrichstraße', 119.97, TRUE, 1),
                                                                                                                                                                            ('Munich', 'Anna', '5B', 'Schmidt', '80331', 'Marienplatz', 159.96, FALSE, 1),
                                                                                                                                                                            ('Hamburg', 'Peter', '20', 'Meier', '20095', 'Jungfernstieg', 199.95, TRUE, 1),
                                                                                                                                                                            ('Cologne', 'Julia', '8', 'Schneider', '50667', 'Hohe Straße', 119.97, FALSE, 2),
                                                                                                                                                                            ('Frankfurt', 'Stefan', '14C', 'Fischer', '60313', 'Zeil', 149.96, TRUE, 2),
                                                                                                                                                                            ('Dresden', 'Laura', '7D', 'Weber', '01067', 'Prager Straße', 179.95, FALSE, 2),
                                                                                                                                                                            ('Stuttgart', 'Michael', '3A', 'Becker', '70173', 'Königstraße', 129.97, TRUE, 3),
                                                                                                                                                                            ('Leipzig', 'Sophia', '19', 'Hoffmann', '04109', 'Petersstraße', 169.96, FALSE, 3),
                                                                                                                                                                            ('Bremen', 'Lukas', '4B', 'Schulz', '28195', 'Sögestraße', 189.95, TRUE, 3),
                                                                                                                                                                            ('Düsseldorf', 'Marie', '16', 'Koch', '40213', 'Königsallee', 139.97, FALSE, 4),
                                                                                                                                                                            ('Hannover', 'Jan', '22', 'Richter', '30159', 'Georgstraße', 149.96, TRUE, 4),
                                                                                                                                                                            ('Nuremberg', 'Lisa', '11', 'Wolf', '90403', 'Karolinenstraße', 179.95, FALSE, 4);

-- Insert Passengers
INSERT INTO passengers (booking_id, first_name, last_name, date_of_birth, type) VALUES
                                                                                    (1, 'Thomas', 'Müller', '1980-04-15', 'adult'),
                                                                                    (1, 'Sara', 'Müller', '2012-06-20', 'child'),
                                                                                    (2, 'Daniel', 'Schmidt', '1990-10-30', 'adult'),
                                                                                    (2, 'Nina', 'Schmidt', '2015-12-12', 'child'),
                                                                                    (2, 'Ben', 'Schmidt', '2023-03-05', 'baby'),
                                                                                    (3, 'Clara', 'Meier', '1985-08-05', 'adult'),
                                                                                    (3, 'Johanna', 'Meier', '2010-11-11', 'child'),
                                                                                    (4, 'Philipp', 'Schneider', '1975-01-25', 'adult'),
                                                                                    (4, 'Emily', 'Schneider', '2008-03-17', 'child'),
                                                                                    (5, 'Oliver', 'Fischer', '1995-09-09', 'adult'),
                                                                                    (5, 'Lena', 'Fischer', '2013-07-02', 'child'),
                                                                                    (5, 'Tim', 'Fischer', '2022-05-18', 'baby'),
                                                                                    (6, 'Erik', 'Weber', '1988-03-30', 'adult'),
                                                                                    (6, 'Sophia', 'Weber', '2011-04-25', 'child'),
                                                                                    (7, 'Simon', 'Becker', '1983-02-15', 'adult'),
                                                                                    (7, 'Mia', 'Becker', '2009-10-18', 'child'),
                                                                                    (8, 'Paul', 'Hoffmann', '1978-06-12', 'adult'),
                                                                                    (8, 'Lilly', 'Hoffmann', '2014-05-09', 'child'),
                                                                                    (8, 'Tom', 'Hoffmann', '2022-11-30', 'baby'),
                                                                                    (9, 'David', 'Schulz', '1992-01-20', 'adult'),
                                                                                    (9, 'Lea', 'Schulz', '2010-12-22', 'child'),
                                                                                    (10, 'Jonas', 'Koch', '1985-05-15', 'adult'),
                                                                                    (10, 'Emma', 'Koch', '2013-08-19', 'child'),
                                                                                    (11, 'Kevin', 'Richter', '1987-07-21', 'adult'),
                                                                                    (11, 'Sophia', 'Richter', '2007-06-10', 'child'),
                                                                                    (11, 'Elisa', 'Richter', '2023-04-01', 'baby'),
                                                                                    (12, 'Hannah', 'Wolf', '1989-03-03', 'adult'),
                                                                                    (12, 'Leon', 'Wolf', '2011-09-23', 'child');

