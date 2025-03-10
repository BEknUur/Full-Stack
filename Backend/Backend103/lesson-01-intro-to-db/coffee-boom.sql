
CREATE DATABASE CoffeeBoom;


CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT,
    product_cost DECIMAL(10,2) NOT NULL,
    product_category VARCHAR(255),
    product_status BOOLEAN DEFAULT TRUE,
    product_data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(255) UNIQUE NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    bonus_points INTEGER DEFAULT 0
);


CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
    total DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    order_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment VARCHAR(50) NOT NULL
);


CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price DECIMAL(10,2) NOT NULL
);

INSERT INTO products (product_name, product_description, product_cost, product_category, product_status, product_data)
VALUES 
('Alma', 'Apple', 100.00, 'Fruits', TRUE, '2025-03-10 12:00:00'),
('Nan','Bread',110.00,'Bakery',True,'2025-03-10 12:00:00');


INSERT INTO customers(name,surname,email,phone,registration_date,bonus_points)
values 
('Beknur','Ualikhanuly','ualihanulybeknur@gmail.com',77777777,'2025-03-10 12:00:00',10),
('Almas','Alikhan','almas@gmail.com',777777770,'2025-03-10 12:00:10',0);


INSERT INTO orders(customer_id,total,status,order_datetime,payment)
values
(1,200.20,DEFAULT,'2025-03-10 12:00:00','card'),
(2,98.40,DEFAULT,'2025-04-10 12:00:00','cash');


INSERT into order_items(order_id,product_id,quantity,price)
values
(1,1,1,100.00),
(2,1,3,300.00);


