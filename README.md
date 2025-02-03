# BlogProject

##Overview

This project is a backend system for a blogging platform where users can write, update, and delete their blogs. The system features role-based access control, allowing users to manage their own blogs while admins can manage users and their content. The public API provides features like search, sorting, and filtering for blog posts.



Technologies Used

TypeScript

Node.js

Express.js

MongoDB with Mongoose

JSON Web Token (JWT) for authentication

Features

1. User Roles

Admin:

Created manually in the database with predefined credentials.

Can delete any blog.

Can block any user by updating a property isBlocked.

Cannot update any blog.

User:

Can register and log in.

Can create blogs when logged in.

Can update and delete their own blogs.

Cannot perform admin actions.

2. Authentication & Authorization

Users must log in to perform write, update, and delete operations.

Role-based access control is enforced.

3. Blog API

Public API to view blogs.

Supports search, sorting, and filtering functionalities.

##Models

User Model
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "admin | user",
  "isBlocked": false,
  "createdAt": "Date",
  "updatedAt": "Date"
}
## Features

### Product Management:
- Add, update, and list Bi-Cycles available for sale.
- Store details like price, description, quantity, and stock status.

### Order Management:
- Customers can create orders specifying the product and quantity.
- Automatically deducts quantity from inventory when an order is placed.

### Revenue Calculation:
- The system calculates the total revenue generated from all orders.
- Provides a revenue summary with the total amount earned.

### RESTful API:
- Exposes endpoints to interact with products, orders, and revenue calculations.

## Technologies Used

- **Backend**:
  - Node.js
  - Express.js
  
- **Database**:
  - MongoDB (NoSQL database)
  - Mongoose (Object Data Modeling for MongoDB)

- **Other**:
  - JavaScript (ES6+)
  - Postman for API testing

## Installation Instructions

Follow these steps to set up the project locally:

### Prerequisites

- **Node.js** installed. [Download Node.js](https://nodejs.org/)
- **MongoDB** installed locally or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for cloud-based MongoDB.

### Steps to Install

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/yourusername/Bi-Cycle-shop-management.git
    cd Bi-Cycle-shop-management
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
    ```bash
    MONGO_URI=mongodb://<your-database-uri>
    ```

4. Start the server:
    ```bash
    npm start
    ```

   This will run the application on `http://localhost:5000`.

## Configuration

### MongoDB URI:
Modify the `MONGO_URI` in the `.env` file to point to your MongoDB instance. You can use MongoDB Atlas if you're hosting your database in the cloud:
```plaintext
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/Bi-Cycle?retryWrites=true&w=majority


## Notes:
- Replace `<product_id>`, `<order_id>` with actual product/order IDs in the request and response data.
- Make sure MongoDB is running locally or use MongoDB Atlas for cloud-based hosting.
- Adjust the values for product prices, quantities, and orders based on actual data in the database.

---

This file consolidates all your API endpoints and can be used for documentation or reference.
