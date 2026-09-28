# ShopIn :  Sprint 15

ShopIn is a full-stack e-commerce application built as the Sprint 15 capstone project. The project focuses on completing the main shopping flow, adding admin access, and running the application with Docker and NGINX.

## Features

* User registration and login
* JWT-based authentication
* Product listing and product details
* Add products to cart
* Update and remove cart items
* Place orders
* View user profile and orders
* Admin dashboard
* Admin product CRUD
* Admin statistics, users and orders
* Role-based access control
* Product image upload
* Responsive UI
* Docker-based setup
* NGINX reverse proxy
* Multiple backend instances

## Tech Stack

### Frontend

* Next.js
* React
* Redux Toolkit
* RTK Query
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs

### Deployment & Infrastructure

* Docker
* Docker Compose
* NGINX
* Vercel
* Render

## Admin Access

An admin account is created using the backend seed script.

```bash
cd backend
npm run seed:admin
```

The admin account is used only for testing the admin dashboard and protected admin features.

## Running Locally

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm start
```

The backend requires environment variables for MongoDB and JWT configuration.

## Running with Docker

From the project root:

```bash
docker compose up -d --build
```

The Docker setup runs:

* MongoDB
* Backend instance 1
* Backend instance 2
* Next.js frontend
* NGINX reverse proxy

The application is available through:

```text
http://localhost:8080
```

The API health endpoint is:

```text
http://localhost:8080/api/health
```

## Role-Based Access

ShopIn has two roles:

* `user` — normal shopping features
* `admin` — admin dashboard and product management

Admin API routes are protected by authentication and role authorization middleware.

Normal users cannot access the admin API or dashboard.

## Docker Architecture

```text
                Browser
                   |
                   v
              NGINX :8080
              /         \
             v           v
       Backend 1      Backend 2
              \         /
                MongoDB
                   |
                   v
             Next.js Frontend
```

NGINX acts as the reverse proxy and distributes API requests between the two backend instances.

## Sprint 15 Goals

This sprint focused on:

1. Completing core CRUD operations
2. Adding role-based access control
3. Containerizing the application
4. Running multiple backend instances
5. Adding NGINX load balancing
6. Preparing the application for production deployment
