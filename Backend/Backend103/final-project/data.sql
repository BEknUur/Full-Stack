-- Добавляем пользователей
INSERT INTO users (first_name, last_name, email, phone, role) VALUES
('Алихан', 'Жумагалиев', 'alihan@mail.kz', '+77011223344', 'owner'),
('Аружан', 'Смагулова', 'aruzhan@mail.kz', '+77022334455', 'renter'),
('Берик', 'Кенжебеков', 'berik@mail.kz', '+77033445566', 'owner');

-- Добавляем автомобили
INSERT INTO cars (owner_id, brand, model, year, price_per_day, status) VALUES
(1, 'Toyota', 'Camry', 2021, 15000, 'available'),
(1, 'Hyundai', 'Tucson', 2022, 18000, 'available'),
(3, 'Kia', 'Sportage', 2023, 20000, 'available');

-- Добавляем бронирования
INSERT INTO bookings (car_id, renter_id, start_date, end_date, total_price, status) VALUES
(1, 2, '2024-03-10', '2024-03-15', 75000, 'confirmed'),
(2, 2, '2024-03-18', '2024-03-22', 90000, 'pending');

-- Добавляем отзывы
INSERT INTO reviews (car_id, renter_id, rating, comment) VALUES
(1, 2, 5, 'Отличный автомобиль! Очень доволен.'),
(2, 2, 4, 'Комфортная машина, но был небольшой шум в салоне.');
