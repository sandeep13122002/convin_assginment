# convin_assginment

# Daily Expenses Sharing Application

## Overview
A backend service for a daily-expenses sharing application that allows users to add expenses and split them among friends using different methods.

## Features

- **User Management**: Create and retrieve user profiles with email, name, and mobile number.
- **Expense Management**: 
  - Add expenses with descriptions and amounts.
  - Split expenses among users using different methods (equal, exact, percentage).
- **Expense Reporting**:
  - Retrieve individual user expenses.
  - Retrieve overall expenses for all users.
  - Easily downloadable balance sheets .
- **User Authentication** (Future enhancement): Secure user data with JWT-based authentication.

## Requirements

- **Node.js**: v12 or higher
- **MongoDB**: v4.0 or higher
- **Postman** : For testing API endpoints

## Setup and Installation

### 1. Clone the Repository

```bash
mkdir daily-expenses-app
cd daily-expenses-app
git clone https://github.com/sandeep13122002/convin_assginment.git .

Install Dependencies

npm install

Configure Environment Variables
Create a .env file in the src directory and add the following variables:

MONGODB=mongodb://localhost:27017/daily-expenses
PORT=your_port_no

Replace your_port_no with your PORT NUMBER example(5000)

Ensure that your MongoDB server is running, or replace the connection string with your database credentials

To Run server
cd src
node index.js


API Documentation

User Endpoints
Create User
POST http://localhost:5000/api/users
Request Body:
json
{
  "email": "user@example.com",
  "name": "User Name",
  "mobile_number": "1234567890"
}

Retrieve User Details
GET /api/users/:id
Example-
GET http://localhost:5000/api/users/6713ecefdfed3b32f781ee7c


Expense Endpoints

Add Expense
POST http://localhost:5000/api/expenses

Request Body:
example:
{
    "amount": 4000,
    "description": "Party expenses",
    "user_id": "6713ecefdfed3b32f781ee7c",
    "split_type": "percentage",
    "splits": [
        {
            "user_id": "6713f1aadfed3b32f781ee7f",
            "percentage": 5100
        },
        {
            "user_id": "6713f1bddfed3b32f781ee81",
            
            "percentage": 25
        },
        {
            "user_id": "6713ecefdfed3b32f781ee7c",
            "percentage": 25
        }
    ]
}

Retrieve Individual User Expenses
GET /api/expenses/user/:id
Example:
GET http://localhost:5000/api/expenses/user/6713ecefdfed3b32f781ee7c

Retrieve Overall Expenses
GET /api/expenses
Example:

GET http://localhost:5000/api/expenses

Download balance sheet
GET http://localhost:5000/api/download-balance-sheet


ScreenShot of ENDPOINTS

https://drive.google.com/drive/folders/1KXcTWxj_-pd_zQu2B7kGfMLA7ddqaDMS?usp=sharing


