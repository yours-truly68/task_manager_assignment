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

# Full Stack Task Manager Application

A modern full-stack Task Manager application built using React, FastAPI, and MongoDB Atlas.

This project was designed to demonstrate:
- Full-stack architecture
- JWT authentication systems
- Secure API communication
- CRUD operations
- React component architecture
- State management
- REST API integration
- Modern responsive UI engineering
- Frontend-backend contract design

The application allows users to:
- Register/Login securely
- Create, edit, update, and delete tasks
- Manage task status and priority
- Search, sort, and paginate tasks
- Access protected resources using JWT authentication

---

# Project Architecture

```txt
Frontend (React + Vite + Tailwind)
        ↓
Axios API Layer
        ↓
FastAPI Backend
        ↓
MongoDB Atlas
```

The frontend and backend are built as independent systems communicating through REST APIs.

This separation improves:
- scalability
- maintainability
- deployment flexibility
- modularity

---

# Why React?

React was chosen because it enables:
- Component-based architecture
- Efficient UI rendering
- State-driven UI updates
- Reusable UI systems
- Large ecosystem support

## Key Advantages
- Declarative UI
- Reusable components
- Easy state management
- Strong ecosystem
- Industry-standard frontend framework

---

# Why Vite Instead of CRA?

Vite was chosen over Create React App because:

| Vite | CRA |
|------|-----|
| Extremely fast dev server | Slower startup |
| Faster HMR | Slower reloads |
| Modern tooling | Older bundling architecture |
| Better DX | More boilerplate |

## Key Benefits
- Faster development experience
- Better performance
- Simpler configuration
- Modern ES module support

---

# Why Tailwind CSS?

Tailwind CSS was used instead of traditional CSS frameworks because it provides:
- Utility-first styling
- Faster UI development
- Consistent design system
- Easier responsive design
- Less CSS maintenance

## Tradeoff

### Pros
- Rapid styling
- No context switching
- Highly customizable
- Cleaner component-level styling

### Cons
- Long classNames
- Initial learning curve

The tradeoff was acceptable because:
- faster development speed
- scalable design consistency
- reduced CSS complexity

---

# Why Context API Instead of Redux?

Context API was chosen because the application currently has:
- moderate global state requirements
- simple authentication state
- no deeply complex state orchestration

## Why Context Was Better Here
- Less boilerplate
- Simpler setup
- Easier learning curve
- Sufficient for auth state management

## When Redux Would Be Better
Redux would become beneficial if the application grows into:
- large-scale enterprise dashboards
- highly complex shared state
- real-time synchronization
- advanced caching systems

---

# Why Axios Instead of Fetch API?

Axios was chosen because it provides:
- cleaner syntax
- interceptors
- automatic JSON handling
- centralized API architecture
- request configuration management

## Important Architectural Decision

A centralized Axios instance was created:

```js
axios.create()
```

instead of using Axios directly inside components.

### Why?

This enables:
- centralized JWT handling
- request interceptors
- reusable API architecture
- cleaner service layers

---

# Why JWT Authentication?

JWT authentication was implemented because:
- stateless authentication scales well
- frontend and backend are decoupled
- suitable for REST APIs
- industry-standard approach

## Authentication Flow

```txt
User Login
    ↓
Backend validates credentials
    ↓
JWT token generated
    ↓
Frontend stores token
    ↓
Protected requests use Bearer token
```

---

# Why LocalStorage For Token Persistence?

JWT tokens are stored in localStorage to persist login state across refreshes.

## Benefits
- Persistent authentication
- Simple implementation
- Suitable for portfolio-scale applications

## Tradeoff
localStorage is vulnerable to XSS attacks.

### Better Production Alternatives
- HttpOnly cookies
- Secure cookie-based auth
- Refresh token architecture

For this project, localStorage was chosen because:
- simpler implementation
- appropriate for internship-level scope
- easier frontend learning experience

---

# Why Protected Routes?

Protected routes ensure:
- unauthorized users cannot access dashboard pages
- frontend authentication state controls navigation
- better user flow and security

This was implemented using:
- Context API
- React Router
- Conditional rendering

---

# Why Modular Component Architecture?

The frontend uses reusable component architecture.

## Extracted Components
- Navbar
- TaskCard
- EditTaskModal
- Input
- Button

## Why?

This improves:
- reusability
- scalability
- maintainability
- readability

Instead of writing repeated JSX and styles everywhere, reusable components centralize UI logic.

---

# Why Service Layer Architecture?

Instead of calling APIs directly inside components:

```js
axios.post(...)
```

a dedicated service layer was implemented.

## Services
- authService.js
- taskServices.js

## Why This Is Better

This separates:
- UI logic
- API logic
- HTTP configuration

Benefits:
- cleaner components
- reusable API functions
- scalable architecture
- easier debugging

---

# Why Query Parameter-Based Sorting?

The backend supports:
- sort_by
- order

through query parameters.

Example:

```txt
/tasks?sort_by=created_at&order=desc
```

## Why This Approach?

Benefits:
- scalable API design
- reusable endpoints
- flexible frontend controls
- database-level sorting

---

# Why Client-Side Search?

Search was implemented on the frontend using:

```js
Array.filter()
```

instead of backend search.

## Why?

For this project:
- task count is relatively small
- faster implementation
- reduced backend complexity
- instant reactive filtering

## Tradeoff

### Pros
- Simpler implementation
- Instant UI updates
- No additional API calls

### Cons
- Not scalable for huge datasets

### Future Improvement
Move search logic to backend using MongoDB text indexes.

---

# Why Client-Side Pagination?

Pagination was implemented on the frontend using:

```js
Array.slice()
```

instead of MongoDB skip/limit.

## Why?

Benefits:
- simpler architecture
- easier implementation
- sufficient for moderate datasets

## Tradeoff

### Pros
- Faster frontend implementation
- Easier state management

### Cons
- Entire dataset still fetched from backend

### Future Improvement
Implement backend pagination using:
- skip()
- limit()
- total pages metadata

---

# Features Implemented

# Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Persistent Login
- Logout Functionality

# Task Management
- Create Tasks
- Read Tasks
- Update Tasks
- Delete Tasks

# Task Controls
- Dynamic Status Selection
- Dynamic Priority Selection
- Sorting
- Search
- Pagination

# UI/UX Features
- Responsive Layout
- Modern Gradient Dashboard
- Glassmorphism UI
- Loading States
- Toast Notifications
- Dynamic Status Badges
- Dynamic Priority Badges
- Modal-Based Editing

---

# Frontend Folder Structure

```txt
src/
│
├── api/
│   └── axios.js
│
├── components/
│   ├── Navbar.jsx
│   ├── TaskCard.jsx
│   ├── EditTaskModal.jsx
│   └── ui/
│       ├── Input.jsx
│       └── Button.jsx
│
├── context/
│   └── AuthContext.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Dashboard.jsx
│
├── routes/
│   └── ProtectedRoute.jsx
│
├── services/
│   ├── authService.js
│   └── taskServices.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://127.0.0.1:8000
```

---

# Installation

## Clone Repository

```bash
git clone <repo-url>
```

---

## Install Dependencies

```bash
npm install
```

---

## Run Development Server

```bash
npm run dev
```

---

# Backend Requirements

The frontend expects:
- FastAPI backend running
- MongoDB Atlas configured
- JWT authentication enabled

---

# Future Improvements

## Backend Improvements
- Refresh Tokens
- Rate Limiting
- Backend Pagination
- Backend Search
- Task Categories
- Due Dates
- File Attachments

## Frontend Improvements
- Drag-and-Drop Kanban Board
- Dark Mode
- Skeleton Loaders
- Framer Motion Animations
- Optimistic UI Updates
- Real-Time Updates
- React Query Integration

## Security Improvements
- HttpOnly Cookie Authentication
- CSRF Protection
- Refresh Token Rotation
- Better Session Management

---

# Key Concepts Demonstrated

This project demonstrates understanding of:

## Frontend Concepts
- React Hooks
- Component Architecture
- Context API
- Controlled Components
- Conditional Rendering
- State Management
- API Integration
- Responsive UI Design

## Backend Concepts
- REST APIs
- JWT Authentication
- Authorization
- Resource-Level Security
- MongoDB Integration
- Query Parameters
- Validation
- Serialization

## Full-Stack Concepts
- Frontend-Backend Separation
- API Contracts
- Authentication Flows
- HTTP Request Lifecycle
- Client-Server Architecture
- Environment Configuration

---

# Conclusion

This project was built to demonstrate practical full-stack engineering concepts using modern technologies and scalable architecture patterns.

The application focuses not only on CRUD functionality, but also on:
- maintainable architecture
- reusable systems
- authentication design
- API integration
- responsive UI engineering
- real-world development practices

# Author

Mohammad Razim
