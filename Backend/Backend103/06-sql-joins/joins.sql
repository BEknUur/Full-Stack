create database auto_kz;

create table cars(
    id serial primary key  ,
    brand varchar(100) not null,
    model varchar(100) not null,
       year INT CHECK (year >= 1900 AND year <= EXTRACT(YEAR FROM CURRENT_DATE)),
    price decimal(12,2) not null check (price>=0),
    status varchar(50)

);
create table clients(
    id serial primary key,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    iin varchar(200) unique not null check(length(iin)=12),
    phone varchar(200) not null ,
    email varchar(200) not null check (email like '%@%')
);
create table sales(
    id serial primary key ,
    car_id integer not null references cars(id) on delete cascade,
    client_id  integer not null references clients(id) on delete cascade ,
    sale_date Date not null default  current_date,
    amount decimal(12,2) not null check(amount>0)

);
create table employees(
    id serial primary key,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    position varchar(100) not null,
    hire_date Date not null check(hire_date<=CURRENT_DATE)
);

-- Добавление автомобилей
INSERT INTO cars (brand, model, year, price, status) VALUES
  ('Toyota', 'Camry', 2024, 18500000, 'в наличии'),
  ('Hyundai', 'Accent', 2023, 9800000, 'в наличии'),
  ('BMW', 'X5', 2024, 45000000, 'под заказ'),
  ('Kia', 'K5', 2023, 15500000, 'в наличии'),
  ('Mercedes', 'E-Class', 2024, 42000000, 'в наличии'),
  ('Toyota', 'Land Cruiser', 2024, 52000000, 'под заказ'),
  ('Hyundai', 'Santa Fe', 2023, 22500000, 'в наличии');

-- Добавление клиентов
INSERT INTO clients (first_name, last_name, iin, phone, email) VALUES
  ('Азамат', 'Сериков', '940825300123', '+77071234567', 'azamat@mail.kz'),
  ('Динара', 'Алиева', '880915400789', '+77082345678', 'dinara@mail.kz'),
  ('Бауыржан', 'Нурланов', '910304500456', '+77093456789', 'baur@mail.kz');

-- Добавление сотрудников
INSERT INTO employees (first_name, last_name, position, hire_date) VALUES
  ('Ерлан', 'Касымов', 'Менеджер продаж', '2023-01-15'),
  ('Айгуль', 'Нурпеисова', 'Старший менеджер', '2022-05-20');

-- Добавление продаж
INSERT INTO sales (car_id, client_id, sale_date, amount) VALUES
  (1, 1, '2024-02-15', 18500000),
  (4, 2, '2024-02-20', 15500000);



-- Отчет по продажам с информацией о клиентах и автомобилях

SELECT
    s.id AS sale_id,
    s.sale_date,
    s.amount AS sale_amount,
    c.first_name || ' ' || c.last_name AS client_name,
    c.phone AS client_phone,
    c.email AS client_email,
    car.brand || ' ' || car.model AS car_name,
    car.year AS car_year,
    car.price AS car_price,
    car.status AS car_status
FROM sales s
JOIN clients c ON s.client_id = c.id
JOIN cars car ON s.car_id = car.id
ORDER BY s.sale_date DESC;


--Список клиентов с количеством их покупок
SELECT
    c.id AS client_id,
    c.first_name || ' ' || c.last_name AS client_name,
    COUNT(s.id) AS total_purchases,
    COALESCE(SUM(s.amount), 0) AS total_spent
FROM clients c
LEFT JOIN sales s ON c.id = s.client_id
GROUP BY c.id
ORDER BY total_purchases DESC;


--Анализ работы менеджеров по продажам
-- no connection between sales and employees




--Статистика продаж по маркам автомобилей
SELECT
    car.brand AS brand,
    COUNT(s.id) AS total_sales,
    COALESCE(SUM(s.amount), 0) AS total_revenue,
    ROUND(AVG(s.amount), 2) AS avg_sale_price
FROM cars car
LEFT JOIN sales s ON car.id = s.car_id
GROUP BY car.brand
HAVING COUNT(s.id) > 0  -- Исключаем бренды без продаж
ORDER BY total_sales DESC;


--Дополнительный запрос: Самый прибыльный месяц
SELECT
    TO_CHAR(s.sale_date, 'YYYY-MM') AS sale_month,
    COUNT(s.id) AS total_sales,
    SUM(s.amount) AS tota_revenu
FROM sales s
WHERE s.sale_date >= CURRENT_DATE - INTERVAL '1 year'
GROUP BY sale_month
ORDER BY tota_revenu DESC
LIMIT 1;
