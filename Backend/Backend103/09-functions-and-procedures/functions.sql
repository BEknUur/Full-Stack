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


--Функция расчёта полной стоимости автомобиля с доп. оборудованием
CREATE OR REPLACE FUNCTION calculate_total_price(
    base_price DECIMAL(12,2),
    has_climate BOOLEAN DEFAULT FALSE,
    has_leather BOOLEAN DEFAULT FALSE,
    has_navigation BOOLEAN DEFAULT FALSE
) RETURNS DECIMAL(12,2) AS $$
DECLARE
    total DECIMAL(12,2);
BEGIN
    -- Начальная цена
    total := base_price;

    -- Дополнительные опции
    IF has_climate THEN
        total := total + 500000;  -- Климат-контроль
    END IF;

    IF has_leather THEN
        total := total + 800000;  -- Кожаный салон
    END IF;

    IF has_navigation THEN
        total := total + 300000;  -- Навигационная система
    END IF;

    RETURN total;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Ошибка при расчете стоимости: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;



-- Функция поиска доступных автомобилей по параметрам


CREATE OR REPLACE FUNCTION find_available_cars(
    brand_param VARCHAR DEFAULT NULL,
    max_price DECIMAL DEFAULT NULL,
    min_year INT DEFAULT NULL
) RETURNS TABLE (
    id INT,
    brand VARCHAR,
    model VARCHAR,
    year INT,
    price DECIMAL(12,2),
    status VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT c.id, c.brand, c.model, c.year, c.price, c.status
    FROM cars c
    WHERE
        (brand_param IS NULL OR c.brand = brand_param)
        AND (max_price IS NULL OR c.price <= max_price)
        AND (min_year IS NULL OR c.year >= min_year)
        AND c.status = 'в наличии'
    ORDER BY c.price ASC;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Ошибка при поиске доступных автомобилей: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;


SELECT * FROM find_available_cars('Toyota', 20000000, 2020);

--Функция анализа продаж за указанный период
CREATE OR REPLACE FUNCTION sales_report(
    start_date DATE,
    end_date DATE
) RETURNS TABLE (
    sale_id INT,
    sale_date DATE,
    client_name VARCHAR,
    car_info VARCHAR,
    amount DECIMAL(12,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT s.id, s.sale_date,
           c.first_name || ' ' || c.last_name AS client_name,
           car.brand || ' ' || car.model AS car_info,
           s.amount
    FROM sales s
    JOIN clients c ON s.client_id = c.id
    JOIN cars car ON s.car_id = car.id
    WHERE s.sale_date BETWEEN start_date AND end_date
    ORDER BY s.sale_date DESC;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Ошибка при анализе продаж: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;


SELECT * FROM sales_report('2024-01-01', '2024-03-01');


-- Функция расчёта комиссии менеджера
CREATE OR REPLACE FUNCTION calculate_commission(
    sale_amount DECIMAL(12,2),
    manager_level VARCHAR DEFAULT 'junior'
) RETURNS DECIMAL(12,2) AS $$
DECLARE
    commission_rate DECIMAL(5,2);
    commission DECIMAL(12,2);
BEGIN

    CASE manager_level
        WHEN 'junior' THEN commission_rate := 0.02;
        WHEN 'mid' THEN commission_rate := 0.04;
        WHEN 'senior' THEN commission_rate := 0.06;
        ELSE commission_rate := 0.03;
    END CASE;


    commission := sale_amount * commission_rate;

    RETURN commission;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Ошибка при расчете комиссии: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;


SELECT calculate_commission(20000000, 'senior');
