# Project Title

E-commerce API

---
## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement.

## Install

    $ git clone https://github.com/sulenchy/ecommerce-api
    $ cd ecommerce-api
    $ npm install

## Database migrate
    - goto to mysql
    - run `create database ecommerceApiDB`
    - run `use ecommerceApiDB`
    - run `source ./database/tshirtshop.sql`
    

## Running the project
    Note: Migrate the database using your terminal before you run `npm start`
    $ git checkout master
    $ npm start

## Simple build for production

    $ npm run build

## Api Endpoints
| Route         | Description   |
| ------------- | ------------- |
| GET /products    | gets all products routes  |
| GET /products/inCategory/:category_id | gets products by category route  |
| GET /products/inDepartment/:department_id | get products by department routes  |
| GET /products/search | search products routes  |
| GET /products/:product_id | gets products by product_id  |
| POST /shoppingcart/add | add item to cart routes  |
| POST /customers | add new customer routes  |
| POST /customers/login | Login routes  |
| PUT /customer | update customer's phone numbers routes |
| PUT /customers/address | update customer's address route  |
| PUT /customers/creditCard | update customer's credit card info route  |
| POST /stripe/charge | checkout route  |


# Authors

Abudu Abiodun Sulaiman




