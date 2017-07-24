DROP TABLE IF EXISTS Customer;

CREATE TABLE Customer (CustomerId bigint PRIMARY KEY, FirstName text, LastName text);

INSERT INTO Customer (CustomerId, FirstName, LastName)
VALUES (1, 'Chuck', 'Norris');


DROP TABLE IF EXISTS Postcard;

CREATE TABLE Postcard (
  PostcardId integer PRIMARY KEY,
  LocationId integer,
  CustomerId integer,
  Message text,
  Font text,
  Layout smallint,
  SentDate date,
  RecipientName text);

INSERT INTO Postcard (PostcardId, LocationId, CustomerId, Message, Font, Layout, SentDate, RecipientName)
VALUES (1, 1, 1, 'Hey nerd, I''m in the France!', 'Comic Sans', 1, '2016-12-25', 'Joopy');


DROP TABLE IF EXISTS Location;

CREATE TABLE Location (
  LocationId integer PRIMARY KEY,
  City text);

INSERT INTO Location(LocationId, City)
VALUES (1, 'Paris');


DROP TABLE IF EXISTS Image;

CREATE TABLE Image (
  ImageId integer PRIMARY KEY,
  CustomerId integer,
  LocationId integer,
  URL text,
  IsPublic boolean);

INSERT INTO Image (ImageId, CustomerId, LocationId, URL, IsPublic)
VALUES (1, 1, 1, '', false);


DROP TABLE IF EXISTS PostcardImage;

CREATE TABLE PostcardImage (
  PostcardImageId integer PRIMARY KEY,
  PostcardId bigint,
  ImageId integer,
  ImageIndex smallint);

INSERT INTO PostcardImage (PostcardImageId, PostcardId, ImageId, ImageIndex)
VALUES (1, 1, 1, 1);