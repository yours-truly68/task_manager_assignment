# Task Manager App

A full-stack Task Manager application built using FastAPI, MongoDB Atlas, React, and Tailwind CSS.

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Password Hashing using bcrypt

### Task Management

* Create Tasks
* Get All Tasks
* Get Single Task
* Update Tasks
* Delete Tasks

### Advanced Features

* User-specific task ownership
* Task sorting
* Enum-based validation
* Protected CRUD APIs
* MongoDB Atlas integration
* Swagger API documentation

---

# Tech Stack

## Backend

* FastAPI
* MongoDB Atlas
* PyMongo
* Python-Jose (JWT)
* Passlib + bcrypt
* Pydantic
* Uvicorn

## Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router DOM

---

# Project Structure

```bash
backend/
│
├── app/
│   ├── routes/
│   ├── schemas/
│   ├── database/
│   ├── utils/
│   └── main.py
│
├── requirements.txt
└── .env
```

---

# Authentication Flow

1. User registers account
2. Password gets hashed before storing
3. User logs in
4. JWT token generated
5. Protected routes validate JWT
6. User-specific task access enforced

---

# Task Features

Each task contains:

* Title
* Description
* Status
* Priority
* Created At
* User Ownership

### Status Options

* todo
* in-progress
* done

### Priority Options

* low
* medium
* high

---

# API Endpoints

## Authentication

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| POST   | `/auth/register` | Register user |
| POST   | `/auth/login`    | Login user    |

---

## Tasks

| Method | Endpoint           | Description        |
| ------ | ------------------ | ------------------ |
| POST   | `/tasks`           | Create task        |
| GET    | `/tasks`           | Get all user tasks |
| GET    | `/tasks/{task_id}` | Get single task    |
| PUT    | `/tasks/{task_id}` | Update task        |
| DELETE | `/tasks/{task_id}` | Delete task        |

---

# Sorting Support

Tasks support sorting using query parameters:

```bash
GET /tasks?sort_by=created_at&order=desc
```

### Supported Order Values

* asc
* desc

---

# Environment Variables

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
```

---

# Installation

## Backend Setup

```bash
git clone <repository-url>

cd backend

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt
```

---

# Run Backend

```bash
python -m uvicorn app.main:app --reload
```

---

# API Documentation

Swagger Docs:

```bash
http://127.0.0.1:8000/docs
```

---

# Security Features

* Password hashing
* JWT authentication
* Protected routes
* Resource ownership validation
* Environment variable protection

---

# Future Improvements

* Frontend dashboard
* Drag and drop Kanban board
* Task filtering
* Due dates
* Search functionality
* Dark mode
* Deployment

---

# Author

Mohammad Razim
