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


--Индекс для поиска автомобилей по марке и модели
create index car_model
on cars(brand,model);


--Индекс для фильтрации по году выпуска
create index idx_car_model
on cars(year);

--Индекс для поиска по ценовому диапазону
create index price_index
on cars(price);


--Индекс для оптимизации JOIN с таблицей клиентов
create index clients_id_index
on sales(client_id);

--Optimization


EXPLAIN ANALYZE
SELECT c.id, c.brand, c.model, c.year, c.price, o.id AS order_id, o.sale_date
FROM cars c
JOIN orders o ON c.id = o.car_id
WHERE c.year > 2020
AND c.price < 10000000;

-- testing
EXPLAIN ANALYZE
SELECT * 
FROM cars c
JOIN orders o ON c.id = o.car_id
WHERE c.year > 2020
AND c.price < 10000000;
