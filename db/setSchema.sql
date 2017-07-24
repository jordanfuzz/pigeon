DROP TABLE IF EXISTS Customer;

CREATE TABLE Customer (CustomerId bigint PRIMARY KEY, FirstName text, LastName text);

INSERT INTO Customer (CustomerId, FirstName, LastName)
VALUES (1, 'Chuck', 'Norris');

--DROP TABLE IF EXISTS Postcard;
--
--CREATE TABLE Postcard (PostcardId int PRIMARY KEY, LocationID int, CustomerID int);
--
--INSERT INTO Customer (CustomerId, FirstName, LastName)
--VALUES (1, 'Chuck', 'Norris');