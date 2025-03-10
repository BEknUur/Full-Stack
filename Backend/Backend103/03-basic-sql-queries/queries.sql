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



-- a) Найти все автомобили стоимостью от 15 до 30 миллионов тенге, отсортированные по цене
select * from  cars
where price>15000000 and price<30000000;

--b) Показать топ-3 самых дорогих автомобиля в наличии
select * from cars
order by price desc
limit 3;


--c) Найти все автомобили Toyota или Hyundai, выпущенные в 2024 году
select * from cars
where cars.brand='Toyota' or cars.brand='Hyundai' and cars.year=2024;


--d) Показать все продажи с информацией о клиентах и автомобилях

SELECT sales.id AS sale_id,
       sales.sale_date,
       sales.amount,
       clients.first_name AS client_first_name,
       clients.last_name AS client_last_name,
       clients.phone,
       clients.email,
       cars.brand,
       cars.model,
       cars.year
FROM sales
JOIN clients ON sales.client_id = clients.id
JOIN cars ON sales.car_id = cars.id;


--e) Показать количество автомобилей каждого бренда в наличии
select brand, count(*)  as car_count
from cars
where status='в наличии'
group by brand;


--f) Найти среднюю стоимость автомобилей по каждому году выпуска

select year ,avg(price) as avg_price
from cars
group by year
order by year  desc;


--g) Показать список клиентов, которые еще не совершали покупок
select * from clients
left join  sales s on clients.id = s.client_id
where s.client_id is null;


--h) Найти сотрудника с наибольшим количеством продаж
    
    -- there is no connection between sales and employees





--i) Показать все автомобили, цена которых выше средней цены по всем автомобилям

select * from cars
where price>(SELECT  avg(price) from cars);


--j) Найти месяц с наибольшим объемом продаж за последний год

SELECT TO_CHAR(sale_date, 'YYYY-MM') AS sale_month, SUM(amount) AS total_sales
FROM sales
WHERE sale_date >= CURRENT_DATE - INTERVAL '1 year'
GROUP BY sale_month
ORDER BY total_sales DESC
LIMIT 1;
