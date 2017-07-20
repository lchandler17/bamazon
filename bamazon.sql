DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER(10) AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(200),
    department_name VARCHAR(200),
    price DECIMAL(5,2),
    stock_qty DECIMAL(5,1)
);

INSERT INTO products (
	product_name, 
    department_name, 
    price, 
    stock_qty
)
VALUES
	("rice cooker", "cookware", 99, 10),
    ("Cutting for Stone", "books", 15.50, 30),
    ("book ends", "home goods", 12, 15),
    ("leather purse", "accessories", 50, 10),
    ("Harry Potter", "books", 20, 87),
    ("red ribbon", "crafting", 1, 92.4),
    ("doge mug", "cookware", 10, 20),
    ("throw pillow", "home goods", 25, 0),
    ("flower pot", "gardening", 10, 22),
    ("t-shirt", "clothing", 20, 12);
