# 🔐 Alpha Auth System

A modern authentication system built with the MERN stack, focusing on secure user authentication, authorization, and session management.

## 🚀 Current Features

### Authentication

* User Registration
* User Login
* JWT Access Token Authentication
* Refresh Token Authentication
* Secure Password Hashing using bcrypt

### Password Recovery

* Forgot Password API
* OTP Generation & Verification
* Password Reset via Email
* Nodemailer Email Integration

### Security

* Access Token & Refresh Token Architecture
* Refresh Token Rotation Support
* Secure Cookie-Based Session Management
* Environment Variable Configuration
* Protected Routes Middleware

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* bcryptjs
* Nodemailer
* Cookie Parser

### Frontend (In Progress)

* React.js
* Redux Toolkit
* Axios
* React Router DOM

---

## 📂 Project Structure

```bash
Alpha/
│
├── client/          # React Frontend
│
├── server/
│   ├── Config/
│   ├── Controllers/
│   ├── Middleware/
│   ├── Models/
│   ├── Routes/
│   └── Utils/
│
└── README.md
```

---

## 🔄 Authentication Flow

### Login Flow

1. User submits email and password.
2. Server validates credentials.
3. Access Token is generated and returned.
4. Refresh Token is stored securely in an HttpOnly Cookie.
5. Protected routes use Access Token for authorization.
6. When Access Token expires, Refresh Token generates a new Access Token.

---

## 🔑 Password Reset Flow

1. User enters email.
2. OTP is generated and sent via Nodemailer.
3. User verifies OTP.
4. User creates a new password.
5. Password is securely hashed and updated in MongoDB.

---

## 📌 Upcoming Features

### Frontend Integration

* React Authentication UI
* Redux Toolkit State Management
* Axios Interceptors
* Protected Routes
* Automatic Token Refresh

### Security Enhancements

* Two Factor Authentication (2FA)
* Account Verification
* Login Activity Tracking
* Session Management

### Future Plans

* Google OAuth Authentication
* Role-Based Access Control (RBAC)
* User Profile Management
* Complete Full Stack Authentication Boilerplate

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/alpha-auth-system.git
cd alpha-auth-system
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_secret
EMAIL=your_email
APP_PASSWORD=your_app_password
```

Start the backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🎯 Current Status

The backend authentication system is functional and includes JWT authentication, refresh tokens, email-based password recovery, and secure session handling.

The next development phase focuses on integrating the frontend with React and Redux Toolkit, implementing token persistence, automatic refresh token handling, and complete authentication workflows.

---

## 👨‍💻 Author

**Ayush Thakur**

MERN Stack Developer

GitHub: https://github.com/ayush349919
LinkedIn: https://linkedin.com/in/ayushthakur9919
