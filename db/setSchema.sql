DROP TABLE IF EXISTS Customer;

CREATE TABLE Customer (CustomerId bigint, FirstName text, LastName text);

INSERT INTO Customer (CustomerId, FirstName, LastName)
VALUES (1, 'Chuck', 'Norris');
