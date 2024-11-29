INSERT INTO airfly_local.airports (name, country, city, code) VALUES
                                                                               ('Los Angeles International Airport', 'United States', 'Los Angeles', 'LAX'),
                                                                               ('John F. Kennedy International Airport', 'United States', 'New York', 'JFK'),
                                                                               ('Heathrow Airport', 'United Kingdom', 'London', 'LHR'),
                                                                               ('Tokyo Haneda Airport', 'Japan', 'Tokyo', 'HND'),
                                                                               ('Sydney Kingsford Smith Airport', 'Australia', 'Sydney', 'SYD'),
                                                                               ('Dubai International Airport', 'United Arab Emirates', 'Dubai', 'DXB'),
                                                                               ('Paris Charles de Gaulle Airport', 'France', 'Paris', 'CDG'),
                                                                               ('Toronto Pearson International Airport', 'Canada', 'Toronto', 'YYZ'),
                                                                               ('Singapore Changi Airport', 'Singapore', 'Singapore', 'SIN'),
                                                                               ('Hong Kong International Airport', 'Hong Kong', 'Hong Kong', 'HKG');

INSERT INTO airfly_local.airplanes (model, capacity) VALUES
                                                                      ('Boeing 737-800', 189),
                                                                      ('Airbus A320', 180),
                                                                      ('Boeing 777-300ER', 396),
                                                                      ('Airbus A350-900', 440),
                                                                      ('Boeing 787 Dreamliner', 242),
                                                                      ('Airbus A330-300', 277),
                                                                      ('Boeing 757-200', 200),
                                                                      ('Boeing 767-300ER', 216),
                                                                      ('Airbus A321neo', 230);

INSERT INTO airfly_local.categories (name, price) VALUES
                                                      ('BASIC', 19.99),
                                                      ('STANDARD', 29.99),
                                                      ('PREMIUM', 39.99);