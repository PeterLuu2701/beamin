USE beamin

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
)

CREATE TABLE restaurant (
    id SERIAL PRIMARY KEY,
    restaurant_name VARCHAR(100) NOT NULL,
    restaurant_address TEXT NOT NULL,
    open_time TIME NOT NULL,
    close_time TIME NOT NULL,
    min_price DECIMAL(10, 2) NOT NULL,
    max_price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE app_menu (
	id SERIAL PRIMARY KEY,
    menu_type VARCHAR(100) NOT NULL
)

CREATE TABLE restaurant_menu (
    id SERIAL PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    restaurant_id INT NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)
);

CREATE TABLE restaurant_food (
    id SERIAL PRIMARY KEY,
    food_name VARCHAR(100) NOT NULL,
    ingredient VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    restaurant_id INT NOT NULL,
    restaurant_menu_id INT NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id),
    FOREIGN KEY (restaurant_menu_id) REFERENCES restaurant_menu(id)
);

CREATE TABLE food_card (
    id SERIAL PRIMARY KEY,
    food_name VARCHAR(100) NOT NULL,
    ingredient VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    restaurant_id INT NOT NULL,
    restaurant_menu_id INT NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id),
    FOREIGN KEY (restaurant_menu_id) REFERENCES restaurant_menu(id)
);

CREATE TABLE food_card (
    id SERIAL PRIMARY KEY,
    food_name VARCHAR(100) NOT NULL,
    restaurant_food_id INT NOT NULL,
    restaurant_id INT NOT NULL,
    restaurant_name VARCHAR(100) NOT NULL,
    restaurant_address VARCHAR(100) NOT NULL,
    app_menu_id INT NOT NULL,
    FOREIGN KEY (restaurant_food_id) REFERENCES restaurant_food(id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id) ,
    FOREIGN KEY (app_menu_id) REFERENCES app_menu(id)
);

ALTER TABLE food_card
ADD COLUMN price DECIMAL(10, 2);

ALTER TABLE food_card
ADD COLUMN app_menu_id INT NOT NULL;

ALTER TABLE food_card
ADD CONSTRAINT fk_app_menu
FOREIGN KEY (app_menu_id) REFERENCES app_menu(id);



CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    food_name VARCHAR(100) NOT NULL,
    restaurant_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    restaurant_id INT NOT NULL,
    restaurant_food_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id),
    FOREIGN KEY (restaurant_food_id) REFERENCES restaurant_food(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (user_name, password) VALUES
('alice', 'password123'),
('bob', 'password456'),
('carol', 'password789');

INSERT INTO restaurant (restaurant_name, restaurant_address, open_time, close_time, min_price, max_price) VALUES
('The Cozy Cafe', '123 Elm Street', '08:00:00', '20:00:00', 5.00, 20.00),
('Gourmet Bistro', '456 Oak Avenue', '10:00:00', '22:00:00', 10.00, 50.00),
('Foodie Haven', '789 Pine Road', '11:00:00', '23:00:00', 8.00, 30.00);

INSERT INTO app_menu (menu_type) VALUES
('Breakfast'),
('Lunch'),
('Dinner'),
('Desserts');

INSERT INTO restaurant_menu (course_name, restaurant_id) VALUES
('Breakfast', 1),
('Lunch', 1),
('Dinner', 1),
('Breakfast', 2),
('Lunch', 2),
('Dinner', 2),
('Breakfast', 3),
('Lunch', 3),
('Dinner', 3);

INSERT INTO restaurant_food (food_name, ingredient, price, restaurant_id, restaurant_menu_id) VALUES
('Pancakes', 'Flour, Milk, Eggs', 8.00, 1, 1),
('Eggs Benedict', 'Eggs, Ham, English Muffin', 12.00, 1, 1),
('Coffee', 'Coffee Beans', 3.00, 1, 1),
('Omelette', 'Eggs, Cheese, Vegetables', 10.00, 1, 2),
('Burger', 'Beef, Lettuce, Tomato, Bun', 15.00, 1, 2),
('Caesar Salad', 'Lettuce, Chicken, Croutons', 12.00, 1, 2),
('Spaghetti', 'Pasta, Tomato Sauce', 14.00, 1, 3),
('Lasagna', 'Pasta, Cheese, Meat', 18.00, 1, 3),
('Pizza Margherita', 'Tomato, Mozzarella, Basil', 16.00, 2, 4),
('Steak', 'Beef, Garlic, Herbs', 25.00, 2, 4),
('Sushi', 'Rice, Fish', 20.00, 2, 5),
('Tempura', 'Seafood, Vegetables', 22.00, 2, 5),
('Chicken Tenders', 'Chicken, Bread Crumbs', 12.00, 2, 6),
('French Fries', 'Potatoes', 5.00, 2, 6),
('Grilled Cheese', 'Bread, Cheese', 8.00, 2, 7),
('Tomato Soup', 'Tomatoes, Cream', 7.00, 2, 7),
('Fish Tacos', 'Fish, Tortillas', 14.00, 3, 8),
('Burrito', 'Beans, Rice, Meat', 13.00, 3, 8),
('Falafel', 'Chickpeas, Spices', 10.00, 3, 9),
('Hummus', 'Chickpeas, Tahini', 9.00, 3, 9);

INSERT INTO food_card (food_name, price, restaurant_id, restaurant_food_id, app_menu_id, restaurant_name, restaurant_address) VALUES
('Pancakes', 8.00, 1, 1, 1, 'The Cozy Cafe', '123 Maple St'),
('Eggs Benedict', 12.00, 1, 2, 1, 'The Cozy Cafe', '123 Maple St'),
('Coffee', 3.00, 1, 3, 1, 'The Cozy Cafe', '123 Maple St'),
('Omelette', 10.00, 1, 4, 2, 'The Cozy Cafe', '123 Maple St'),
('Burger', 15.00, 1, 5, 2, 'The Cozy Cafe', '123 Maple St'),
('Caesar Salad', 12.00, 1, 6, 2, 'The Cozy Cafe', '123 Maple St'),
('Spaghetti', 14.00, 1, 7, 3, 'The Cozy Cafe', '123 Maple St'),
('Lasagna', 18.00, 1, 8, 3, 'The Cozy Cafe', '123 Maple St'),
('Pizza Margherita', 16.00, 2, 9, 4, 'Gourmet Bistro', '456 Oak Ave'),
('Steak', 25.00, 2, 10, 4, 'Gourmet Bistro', '456 Oak Ave'),
('Sushi', 20.00, 2, 11, 4, 'Gourmet Bistro', '456 Oak Ave'),
('Tempura', 22.00, 2, 12, 4, 'Gourmet Bistro', '456 Oak Ave'),
('Chicken Tenders', 12.00, 2, 13, 4, 'Gourmet Bistro', '456 Oak Ave'),
('French Fries', 5.00, 2, 14, 4, 'Gourmet Bistro', '456 Oak Ave'),
('Grilled Cheese', 8.00, 2, 15, 4, 'Gourmet Bistro', '456 Oak Ave'),
('Tomato Soup', 7.00, 2, 16, 4, 'Gourmet Bistro', '456 Oak Ave'),
('Fish Tacos', 14.00, 3, 17, 4, 'Foodie Haven', '789 Pine Rd'),
('Burrito', 13.00, 3, 18, 4, 'Foodie Haven', '789 Pine Rd'),
('Falafel', 10.00, 3, 19, 4, 'Foodie Haven', '789 Pine Rd'),
('Hummus', 9.00, 3, 20, 4, 'Foodie Haven', '789 Pine Rd');

INSERT INTO orders (food_name, restaurant_name, price, quantity, total, restaurant_id, restaurant_food_id, user_id) VALUES
('Pancakes', 'The Cozy Cafe', 8.00, 2, 16.00, 1, 1, 1),
('Burger', 'The Cozy Cafe', 15.00, 1, 15.00, 1, 5, 2),
('Sushi', 'Gourmet Bistro', 20.00, 3, 60.00, 2, 11, 3);
