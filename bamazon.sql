USE bamazon;

CREATE TABLE products (

item_id INTEGER(15) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price FLOAT (10) NOT NULL,
stock_quantity INTEGER (20) NOT NULL,
PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("toothpaste", "bath", 2.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("soap", "bath", 3.00, 20), ("tv", "electronics", 999.99, 5), ("steak", "grocery", 10.50, 10), ("notebook", "office", 3.25, 30), ("bananas", "grocery", 0.79, 50), ("pens", "office", 1.00, 100), ("computer", "electronics", 500.00, 50); 

 INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shampoo", "bath", 6.75, 75), ("headphones", "electronics",45.99, 25);