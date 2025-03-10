SELECT * FROM cars WHERE status = 'available' ORDER BY price_per_day ASC;

SELECT b.id AS booking_id, c.brand, c.model, b.start_date, b.end_date, b.total_price, b.status
FROM bookings b
JOIN cars c ON b.car_id = c.id
WHERE b.renter_id = 2;

SELECT c.brand, c.model, COUNT(b.id) AS total_bookings
FROM bookings b
JOIN cars c ON b.car_id = c.id
GROUP BY c.brand, c.model
ORDER BY total_bookings DESC
LIMIT 3;


SELECT c.brand, c.model, COUNT(b.id) AS total_bookings
FROM bookings b
JOIN cars c ON b.car_id = c.id
GROUP BY c.brand, c.model
ORDER BY total_bookings DESC
LIMIT 3;
