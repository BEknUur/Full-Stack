create database auto_kz;

create table cars(
    id serial primary key  ,
    brand varchar(100) not null,
    model varchar(100) not null,
       year INT CHECK (year >= 1900 AND year <= EXTRACT(YEAR FROM CURRENT_DATE)),
    price decimal(12,2) not null check (price>=0),
    status varchar(50) check (status in ('available', 'sold', 'reserved') )

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

insert into cars(brand, model, year, price, status)
values
('Toyota','Camry',2022,9000000,'available'),
('Hyundai', 'Elantra', 2021, 22000000, 'available'),
('BMW', 'X5', 2020, 45000000, 'sold'),
('Mercedes', 'C-Class', 2023, 50000000, 'available'),
('Kia', 'Sportage', 2019, 18000000, 'reserved');



insert into clients(first_name, last_name, iin, phone, email)
values
    ('Beknur','Ualikhanuly',123456789111,77777777777,'beknur@gmail.com'),
('Мария', 'Иванова', '870987654321', '+77019876543', 'maria@example.com'),
('Дмитрий', 'Смирнов', '850654321098', '+77778889900', 'dmitriy@example.com');


INSERT INTO employees (first_name, last_name, position, hire_date) VALUES
('Азамат', 'Кайратов', 'Менеджер по продажам', '2020-05-10'),
('Алия', 'Садыкова', 'Финансовый директор', '2018-09-15');



INSERT INTO sales (car_id, client_id, sale_date, amount) VALUES
(3, 6, '2024-03-01', 45000000),
(5, 7, '2024-03-05', 18000000);