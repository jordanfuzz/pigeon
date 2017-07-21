INSERT INTO Customer(CustomerId, FirstName, LastName)
VALUES($1, $2, $3)
RETURNING *;