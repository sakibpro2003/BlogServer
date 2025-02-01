# Bi-Cycle Shop Management System

A comprehensive **Bi-Cycle Shop Management System** for managing product inventory, processing customer orders, and calculating total revenue. This project is built with **Node.js**, **Express.js**, and **MongoDB** using **Mongoose** for object data modeling.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation Instructions](#installation-instructions)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [License](#license)
- [Contributors](#contributors)

## Project Overview

The **Bi-Cycle Shop Management System** is designed to manage a Bi-Cycle shop’s product catalog and customer orders. Key functionalities include:

- **Product Management**: Admins can manage different Bi-Cycle products in the shop’s inventory.
- **Order Management**: Customers can place orders, which track the quantity and total cost of products.
- **Revenue Calculation**: The system calculates the total revenue by multiplying the quantity of Bi-Cycles ordered by their price.

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
