INSERT INTO Image (CustomerId, LocationId, URL, IsPublic)
VALUES ($1, $2, $3, $4)
RETURNING *;