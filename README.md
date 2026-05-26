# Task Manager App

A full-stack Task Manager application built using React, FastAPI, and MongoDB.

The application allows users to:

* Register and login securely
* Manage tasks across multiple stages
* Access protected routes using JWT authentication

---

# Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS

## Backend

* FastAPI
* Python
* Uvicorn

## Database

* MongoDB Atlas
* PyMongo

## Authentication

* JWT (JSON Web Tokens)
* Passlib + Bcrypt password hashing

---

# Features Implemented

## Authentication

* User Registration
* User Login
* Password Hashing using bcrypt
* JWT Token Generation
* Protected Route Authentication

## Backend Features

* FastAPI project setup
* MongoDB Atlas integration
* Environment variable management
* Request validation using Pydantic
* Modular backend architecture

## API Documentation

* Swagger UI documentation available at:

```bash
http://127.0.0.1:8000/docs
```

---

# Project Structure

```bash
backend/
│
├── app/
│   ├── database/
│   │   └── mongodb.py
│   │
│   ├── routes/
│   │   └── auth.py
│   │
│   ├── schemas/
│   │   └── user_schema.py
│   │
│   ├── utils/
│   │   ├── auth.py
│   │   ├── jwt_handler.py
│   │   └── dependencies.py
│   │
│   └── main.py
│
├── venv/
├── .env
├── requirements.txt
└── README.md
```

---

# Environment Variables

Create a `.env` file inside the backend folder.

```env
MONGO_URI=your_mongodb_connection_string
DATABASE_NAME=taskmanager
JWT_SECRET=your_secret_key
```

---

# Installation & Setup

## 1. Clone Repository

```bash
git clone <repository_url>
cd Task_Manager
```

---

## 2. Create Virtual Environment

### Mac/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

---

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Run Backend Server

```bash
python -m uvicorn app.main:app --reload
```

---

# Authentication Flow

## Register

Users can create an account using:

* name
* email
* password

Passwords are securely hashed before storage.

---

## Login

Users receive a JWT access token after successful login.

---

## Protected Routes

JWT authentication is used to protect private routes.

---

# Technical Decisions

## Why FastAPI?

* Fast development speed
* Automatic Swagger documentation
* Built-in validation using Pydantic
* Clean API architecture

## Why MongoDB?

* Flexible document-based database
* Faster setup for small projects
* Easy integration with FastAPI

## Why JWT?

* Stateless authentication
* Simple frontend integration
* Industry-standard approach

---

# Challenges Faced

* MongoDB SSL certificate verification issue on macOS
* Bcrypt compatibility issues with Python 3.13
* Virtual environment interpreter conflicts in VS Code

---

# Fixes Applied

* Added `certifi` for MongoDB SSL verification
* Downgraded bcrypt to a stable compatible version
* Configured VS Code interpreter to use virtual environment

---

# Current Progress

Completed:

* Backend setup
* MongoDB integration
* Authentication system
* JWT protected routes

In Progress:

* Task CRUD APIs
* Frontend implementation

---

# Future Improvements

* Drag and drop task management
* Task filtering and search
* Due dates and reminders
* Deployment using Render and Vercel
* Frontend state management improvements

---

# Author

Mohammad Razim
