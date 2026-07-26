# Alpha - MERN Authentication & User Management Backend

A secure and scalable authentication & user management backend built with Node.js, Express.js, MongoDB, Redis, and JWT.

This project implements modern authentication practices including Access Tokens, Refresh Tokens, Redis-based session management, OTP-based password recovery, rate limiting, cooldown protection, and user account management.

---

## Features

### Authentication

- User Registration
- User Login
- JWT Access Token Authentication
- JWT Refresh Token Authentication
- Redis-Based Refresh Token Storage
- Secure Logout
- Protected Routes Middleware

### Password Recovery

- Forgot Password
- OTP Generation via Email
- OTP Verification
- Password Reset

### OTP Security

- OTP Expiry (5 Minutes)
- OTP Cooldown Protection
- OTP Request Rate Limiting
- OTP Verification Attempt Limiting

### User Management

- Get User Profile
- Update User Profile
- Change Password
- Delete Account

### Security Features

- Password Hashing with bcrypt
- HttpOnly Refresh Token Cookies
- Redis Session Management
- Password Reuse Prevention
- Express Validator Request Validation
- Protected API Endpoints

---

## Tech Stack

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Caching & Session Management

- Redis

### Authentication & Security

- JWT (JSON Web Tokens)
- bcrypt
- Express Validator
- Cookie Parser

### Email Service

- Nodemailer

### Development Tools

- Nodemon
- Concurrently
- Morgan

---

## Project Structure

```bash
server/
│
├── config/
│   ├── db.js
│   └── redis.js
│
├── controllers/
│   ├── auth/
│   └── rolebased/
│
├── middlewares/
│   └── verifyToken.js
│
├── models/
│   └── User.js
│
├── routes/
│   ├── auth.route.js
│   └── rolebased/
│
├── tokens/
│   └── tokens.js
│
├── utils/
│   ├── ResponseHandler.js
│   ├── rateLimiter.js
│   └── otpCooldown.js
│
├── validators/
│   └── validators.js
│
└── app.js
```

---

## Authentication Flow

```text
User Login
      ↓
Generate Access Token (15 Minutes)
      ↓
Generate Refresh Token (7 Days)
      ↓
Store Refresh Token in Redis
      ↓
Store Refresh Token in HttpOnly Cookie
      ↓
Access Protected Routes
      ↓
Refresh Endpoint Generates New Access Token
```

---

## Password Reset Flow

```text
User Enters Email
      ↓
Generate OTP
      ↓
Store OTP in Redis (5 Minutes)
      ↓
Send OTP via Email
      ↓
Verify OTP
      ↓
Store Verification State in Redis
      ↓
Create New Password
      ↓
Update Password
      ↓
Remove Verification State
```

---

## API Endpoints

### Authentication

#### Register User

```http
POST /api/auth/register
```

#### Login User

```http
POST /api/auth/login
```

#### Refresh Access Token

```http
POST /api/auth/refresh-token
```

#### Logout User

```http
POST /api/auth/logout
```

---

### Password Recovery

#### Send OTP

```http
POST /api/auth/send-otp
```

#### Verify OTP

```http
POST /api/auth/verify-otp
```

#### Reset Password

```http
PUT /api/auth/new-password
```

---

### User Management

#### Get Profile

```http
GET /api/user/profile
```

#### Update Profile

```http
PUT /api/user/updateprofile
```

#### Change Password

```http
PUT /api/user/changepassword
```

#### Delete Account

```http
DELETE /api/user/deleteaccount
```

---

## Environment Variables

Create a `.env` file inside the server directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_secret

REFRESH_TOKEN_SECRET=your_refresh_secret

EMAIL_USER=your_email

EMAIL_PASS=your_email_password

CLIENT_URL=http://localhost:5173
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/ayush349919/Alpha.git
```

### Navigate to Project

```bash
cd Alpha
```

### Install Dependencies

#### Root

```bash
npm install
```

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd ../client
npm install
```

---

## Redis Setup

Start Redis Container

```bash
docker start redis-server
```

Verify Redis

```bash
docker ps
```

---

## Run Project

From root directory:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

---

## Current Status

### Completed

- User Registration
- User Login
- JWT Authentication
- Access Token & Refresh Token System
- Redis Session Management
- Secure Logout
- OTP-Based Password Recovery
- OTP Cooldown Protection
- OTP Rate Limiting
- OTP Verification Attempt Limiting
- User Profile APIs
- Change Password API
- Delete Account API

### Upcoming

- Redux Toolkit Integration
- Axios Interceptors
- Automatic Token Refresh Handling
- Frontend Protected Routes
- Role-Based Access Control (RBAC)
- Docker Compose Setup
- Deployment

---

## Author

Ayush Thakur

- LinkedIn: https://linkedin.com/in/ayushthakur9919
- GitHub: https://github.com/ayush349919

---