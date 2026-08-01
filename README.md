# Alpha

A modern **Communication Platform** built with **Node.js, Express.js, React, MongoDB, Redis, and JWT**.

Alpha demonstrates production-ready authentication practices, secure session management, real-time communication, and AI-powered features.

---

## ✨ Current Features

### 🔐 Authentication
- User Registration & Login
- JWT Access & Refresh Token Authentication
- Secure Logout
- Protected Routes
- Role-Based Authorization (RBAC)

### 🔒 Session Management
- Redis-based Refresh Token Storage
- Refresh Token Rotation & Validation
- Session Revocation on Logout
- Automatic Token Invalidation after Password Change

### 🔑 Password Recovery
- Forgot Password
- Email OTP Verification
- Secure Password Reset

### 🛡️ Security
- Password Hashing (bcrypt)
- HttpOnly Refresh Token Cookies
- OTP Expiry & Cooldown
- OTP Rate Limiting
- OTP Verification Attempt Limiting
- Password Reuse Prevention
- Express Validator
- Protected API Endpoints

### 👤 User Management
- Get Profile
- Update Profile
- Change Password
- Delete Account

---

## 🚀 Upcoming Features

### 💻 Frontend
- Redux Toolkit
- Axios Interceptors
- Automatic Access Token Refresh
- Protected Frontend Routes
- Responsive UI

### 💬 Real-Time Chat
- One-to-One Messaging
- Socket.IO Integration
- Online/Offline Status
- Typing Indicators
- Read Receipts
- Emoji Support
- Image & File Sharing

### 🤖 AI Features
- AI Chat Assistant
- AI Message Suggestions
- Grammar & Tone Improvement
- Smart Reply Generation
- Message Translation
- Conversation Summary

### 🛠️ Admin Panel
- Admin Dashboard
- User Management
- User Analytics
- Activity Logs
- Reports & Moderation

### 🔐 Advanced Security
- Google OAuth
- Two-Factor Authentication (2FA)
- Login History
- Device Management
- Docker & CI/CD Deployment

---

## 🛠️ Tech Stack

**Frontend**
- React
- Redux Toolkit
- Tailwind CSS
- Axios

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB Atlas
- Mongoose

**Cache**
- Redis

**Authentication**
- JWT
- bcrypt
- Cookie Parser
- Express Validator

**Real-Time**
- Socket.IO *(Upcoming)*

**AI**
- OpenAI / Gemini *(Upcoming)*

**Other**
- Nodemailer
- Morgan
- Docker *(Upcoming)*

---

## 📂 API Modules

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

## ⚙️ Environment Variables

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

## 🚀 Installation

```bash
git clone https://github.com/ayush349919/Alpha.git

cd Alpha

npm install

cd server
npm install

cd ../client
npm install
```

---

## ▶️ Run Project

```bash
npm run dev
```

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000
```

---

## 📌 Project Roadmap

- ✅ Secure Authentication
- ✅ Redis Session Management
- ✅ Password Recovery with OTP
- ✅ User Profile Management
- 🔄 Redux Toolkit Integration
- 🔄 Automatic Token Refresh
- 🔄 Real-Time Chat
- 🔄 AI Chat Assistant
- 🔄 Admin Dashboard
- 🔄 Docker & Deployment

---

## 👨‍💻 Author

**Ayush Thakur**

- GitHub: https://github.com/ayush349919
- LinkedIn: https://linkedin.com/in/ayushthakur9919