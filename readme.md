# Project Title

E-commerce API

---
## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

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
