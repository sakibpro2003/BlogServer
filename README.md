# Blogging Platform Backend

## Overview

This project is a backend system for a blogging platform where users can write, update, and delete their blogs. The system features role-based access control, allowing users to manage their own blogs while admins can manage users and their content. The public API provides features like search, sorting, and filtering for blog posts.

## Technologies Used

- **TypeScript**
- **Node.js**
- **Express.js**
- **MongoDB with Mongoose**
- **JSON Web Token (JWT) for authentication**

## Features

### 1. User Roles

#### **Admin:**

- Created manually in the database with predefined credentials.
- Can delete any blog.
- Can block any user by updating a property `isBlocked`.
- Cannot update any blog.

#### **User:**

- Can register and log in.
- Can create blogs when logged in.
- Can update and delete their own blogs.
- Cannot perform admin actions.

### 2. Authentication & Authorization

- Users must log in to perform write, update, and delete operations.
- Role-based access control is enforced.

### 3. Blog API

- Public API to view blogs.
- Supports search, sorting, and filtering functionalities.

##

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "admin | user",
  "isBlocked": false,
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### **Blog Model**

```json
{
  "title": "string",
  "content": "string",
  "author": "ObjectId",
  "isPublished": true,
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## API Endpoints

### 1. Authentication

#### Register User

**POST** `/api/auth/register`

##### Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

##### Response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "name": "string",
    "email": "string"
  }
}
```

#### Login User

**POST** `/api/auth/login`

##### Request Body:

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

##### Response:

```json
{
  "success": true,
  "message": "Login successful",
  "statusCode": 200,
  "data": {
    "token": "string"
  }
}
```

### 2. Blog Management

#### Create Blog

**POST** `/api/blogs`

##### Request Header:

```
Authorization: Bearer <token>
```

##### Request Body:

```json
{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}
```

##### Response:

```json
{
  "success": true,
  "message": "Blog created successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}
```

#### Update Blog

**PATCH** `/api/blogs/:id`

##### Request Header:

```
Authorization: Bearer <token>
```

##### Request Body:

```json
{
  "title": "Updated Blog Title",
  "content": "Updated content."
}
```

#### Delete Blog

**DELETE** `/api/blogs/:id`

##### Request Header:

```
Authorization: Bearer <token>
```

##### Response:

```json
{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}
```

### 3. Admin Actions

#### Block User

**PATCH** `/api/admin/users/:userId/block`

##### Request Header:

```
Authorization: Bearer <admin_token>
```

##### Response:

```json
{
  "success": true,
  "message": "User blocked successfully",
  "statusCode": 200
}
```

#### Delete Any Blog

**DELETE** `/api/admin/blogs/:id`

##### Request Header:

```
Authorization: Bearer <admin_token>
```

##### Response:

```json
{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}
```

## Bonus: Error Handling

A consistent error response format is maintained across all endpoints:

```json
{
  "success": false,
  "message": "Error message describing the issue",
  "statusCode": 400,
  "error": {"details": "Additional error details, if applicable"},
  "stack": "error stack trace, if available"
}
```

### Common Errors

- **Zod Validation Error**: Invalid data input.
- **Not Found Error**: Requested resource not found.
- **Authentication Error**: Invalid credentials or token.
- **Authorization Error**: Insufficient permissions.
- **Internal Server Error**: Unexpected issues.

## Installation and Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/sakibpro2003/BlogServer.git
   ```
2. Navigate to the project directory:
   ```sh
   cd blog-server
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the root directory and set up the necessary environment variables(follow .env.example):
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
5. Run the application:
   ```sh
   npm run dev
   ```

## License

This project is licensed under the MIT License.

add readme.md syntax 

