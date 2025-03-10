-- Создаем базу данных
CREATE DATABASE qazaq_rental;
\c qazaq_rental;

-- Таблица пользователей (арендаторы и владельцы)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    role VARCHAR(20) CHECK (role IN ('owner', 'renter')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица автомобилей
CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    owner_id INT NOT NULL,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INT CHECK (year BETWEEN 2000 AND EXTRACT(YEAR FROM CURRENT_DATE)),
    price_per_day DECIMAL(10,2) NOT NULL CHECK (price_per_day > 0),
    status VARCHAR(50) CHECK (status IN ('available', 'rented', 'inactive')) DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Таблица бронирований
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    car_id INT NOT NULL,
    renter_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL CHECK (end_date > start_date),
    total_price DECIMAL(12,2) NOT NULL CHECK (total_price > 0),
    status VARCHAR(50) CHECK (status IN ('pending', 'confirmed', 'canceled', 'completed')) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE,
    FOREIGN KEY (renter_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Таблица отзывов и рейтингов
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    car_id INT NOT NULL,
    renter_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5) NOT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE,
    FOREIGN KEY (renter_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Индексы для ускорения запросов
CREATE INDEX idx_cars_owner_id ON cars(owner_id);
CREATE INDEX idx_bookings_car_id ON bookings(car_id);
CREATE INDEX idx_bookings_renter_id ON bookings(renter_id);
