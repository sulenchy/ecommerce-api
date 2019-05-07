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

## Scaling to support more active users
This web app is currently a monolithic web app. This means that the several units of the app lives in a codebase. It currently support 100,000 daily active users. To scale to 1,000,000 daily active users, it is time to transition to microservices. The idea behind microservices is that the several units that made up of the web app are separated into a different codebases that we can scale independently. Simply put, We can have the database separate on a service and have the other parts(controllers, middlewares, helpers and routes) on a separate service. Lets break how to achieve this into steps:

1. Inform the users about the current situation: this could help boost the users confidence in us. Inform them about the current situation and what we are doing to solve the bottleneck. Note that: Throughout the time, we ensure that the existing system is intact.
2. Spliting the database into two or more innstances: Here we can think of switching from relational database to Nosql such as mongodb because they embrace scalability naturally. We can think of using prisma. 
3. Have the static files such as images on a separate server such as firebase, cloudinary etc.
4. Have the database related files such models to a separate server.
5. Have other files on a separate server
6. Use a load balancer such as Elastic Load Balancing to redirect the existing system to new services.

Note: Feel free to suggest any addition or substraction

## Geographical Scalability
Given that a half of the daily active users in our app come from the United States, there is a hug responsibility to consider goegraphical scalability. This is all about having our app resources locate a geograpical location. We can achieve this by having our resources on AWS web service.



