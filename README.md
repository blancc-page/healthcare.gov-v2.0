# 🏥 Healthcare.gov – Authentication Flow Demo

Healthcare.gov is a MERN-stack demo application that showcases a scalable, secure, and reliable user authentication flow for private health insurance comparison platforms. This instance focuses on **user management**—from registration and login to email verification and password recovery.

---

## 🚀 Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js, Express
- **Database:** MongoDB (Atlas)
- **Authentication & Security:** JWT, bcrypt, nodemailer, cookies, sessions
- **Deployment:** [Render](https://healthcare-gov-frontend.onrender.com)

---

## ✨ Features

- 🔐 **User Authentication**
  - Register, Login, Logout
- ✅ **Email Verification**
  - OTP-based account verification
- 🔁 **Password Recovery**
  - Email-based OTP to reset password
- 🍪 **JWT with HTTP-Only Cookies**
  - Persistent and secure sessions

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/healthcare.gov.git
cd healthcare.gov

### 2. CD into these folders

cd server
npm install

cd client
npm install

### 3. Set up environment variables

#### .env (SERVER)
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development

SMTP_USER=your_mailtrap_or_provider_user
SMTP_PASSWORD=your_smtp_password
SENDER_EMAIL=youremail@example.com

#### .env (CLIENT)
BACKEND_URL=http://localhost:4000/
MODE=development


### 4. Run the app locally

# In the server folder
npm run server

# In the client folder
npm run dev

### 🔗 Live Demo
👉 healthcare-gov-frontend.onrender.com