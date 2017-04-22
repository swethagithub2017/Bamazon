CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products (
id INTEGER(11) AUTO_INCREMENT NOT NULL, 
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,2)NOT NULL,
stock_quantity INTEGER(10)NOT NULL,
PRIMARY KEY(id)
);


INSERT INTO `bamazon_db`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('t-shirts', 'clothing', 150, 5);
INSERT INTO `bamazon_db`.`products` ( `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ( 'ipads', 'electronics', 650.00, 4);
INSERT INTO `bamazon_db`.`products` ( `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ( 'lord of the rings', 'books', 30.00, 2);
INSERT INTO `bamazon_db`.`products` ( `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ( 'barbie', 'toys', 20.00, 1);
INSERT INTO `bamazon_db`.`products` ( `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ( 'shorts', 'clothing', 20.00, 1);
INSERT INTO `bamazon_db`.`products` ( `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ( 'paw patrol', 'toys', 20.00, 2);
SELECT*FROM bamazon_db.products;