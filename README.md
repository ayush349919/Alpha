# Alpha

A secure MERN authentication and user management system built with Node.js, Express.js, MongoDB Atlas, Redis, and JWT.

The project focuses on modern authentication practices including Access Tokens, Refresh Tokens, Redis session management, OTP-based password recovery, password invalidation, and user account management.

---

## Features

### Authentication

- User Registration
- User Login
- JWT Access Token Authentication
- JWT Refresh Token Authentication
- Secure Logout
- Protected Routes Middleware

### Session Management

- Redis-Based Refresh Token Storage
- Refresh Token Validation
- Refresh Token Revocation on Logout

### Password Recovery

- Forgot Password
- Email OTP Verification
- Password Reset

### OTP Security

- OTP Expiry
- OTP Cooldown Protection
- OTP Request Rate Limiting
- OTP Verification Attempt Limiting

### User Management

- Get Profile
- Update Profile
- Change Password
- Delete Account

### Security Features

- Password Hashing with bcrypt
- HttpOnly Refresh Token Cookies
- Express Validator Request Validation
- Password Reuse Prevention
- Password Change Token Invalidation
- Protected API Endpoints

---

## Tech Stack

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Cache & Session Storage

- Redis

### Authentication & Security

- JWT
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
User Requests Password Reset
            ↓
Generate OTP
            ↓
Store OTP in Redis
            ↓
Send OTP via Email
            ↓
Verify OTP
            ↓
Create Password Reset Session
            ↓
Set New Password
            ↓
Delete OTP & Reset Session
```

---

## Password Change Security Flow

```text
User Changes Password
        ↓
Update Password
        ↓
Set passwordChangedAt
        ↓
Delete Refresh Token From Redis
        ↓
Clear Refresh Token Cookie
        ↓
Invalidate Previously Issued Tokens
        ↓
Force Re-Login
```

---

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh-token
POST /api/auth/logout
```

### Password Recovery

```http
POST /api/auth/send-otp
POST /api/auth/verify-otp
PUT  /api/auth/new-password
```

### User

```http
GET    /api/user/profile
PUT    /api/user/updateprofile
PUT    /api/user/changepassword
DELETE /api/user/deleteaccount
```

---

## Environment Variables

Create a `.env` file inside the server directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret

REFRESH_TOKEN_SECRET=your_refresh_token_secret

EMAIL_USER=your_email

EMAIL_PASS=your_email_password

CLIENT_URL=http://localhost:5173
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/ayush349919/Alpha.git
```

Navigate to the project:

```bash
cd Alpha
```

Install dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
cd server
npm install
```

Install frontend dependencies:

```bash
cd ../client
npm install
```

---

## Redis Setup

Start Redis Container:

```bash
docker start redis-server
```

Verify Redis:

```bash
docker ps
```

---

## Run The Project

From the root directory:

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

## Project Status

### Completed

- User Registration
- User Login
- JWT Authentication
- Access & Refresh Token System
- Redis Session Management
- Secure Logout
- OTP-Based Password Recovery
- OTP Rate Limiting
- OTP Cooldown Protection
- Profile Management
- Change Password
- Delete Account
- Password Invalidation After Password Change

### Next Steps

- Redux Toolkit Integration
- Axios Interceptors
- Automatic Access Token Refresh
- Protected Frontend Routes
- Role-Based Access Control (RBAC)
- Docker Compose Setup
- Deployment

---

## Author

**Ayush Thakur**

- GitHub: https://github.com/ayush349919
- LinkedIn: https://linkedin.com/in/ayushthakur9919