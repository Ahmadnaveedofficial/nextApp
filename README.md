# Mystery Message

A modern full-stack anonymous messaging platform built with **Next.js 16**, **TypeScript**, **MongoDB**, and **NextAuth**. Users can create an account, verify their email, receive anonymous messages, manage their inbox, and generate AI-powered message suggestions.

This project was built collaboratively by two developers as a learning-focused real-world application, following modern development practices and clean architecture.

---

## Features

- User Authentication
  - Sign Up
  - Sign In
  - Secure Logout
  - Protected Routes using Middleware

- Email Verification
  - OTP Verification
  - Google App Password + Nodemailer
  - Beautiful HTML Email Template

- Anonymous Messaging
  - Send messages anonymously
  - Receive anonymous messages
  - Delete messages
  - Enable/Disable accepting messages

- AI Integration
  - Generate anonymous message suggestions
  - Clean API architecture

- Dashboard
  - Inbox Management
  - Accept Messages Toggle
  - Real-time UI Updates

- Form Validation
  - React Hook Form
  - Zod Validation

- Responsive UI
  - Tailwind CSS
  - shadcn/ui Components
  - Mobile Friendly
  - Modern Glassmorphism Design

---

# Tech Stack

## Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React
- Axios
- React Hook Form
- Zod
- Sonner Toast
- Day.js

---

## Backend

- Next.js Route Handlers
- MongoDB
- Mongoose
- NextAuth.js
- JWT Authentication
- Nodemailer
- Google App Password

---

## AI

- AI Service Layer
- Message Suggestion API

---

## Database

MongoDB Atlas

Collections

- Users
- Messages

---

# Project Structure

```text
src
│
├── app
│   ├── (main)
│   │   ├── (app)
│   │   │   ├── dashboard
│   │   │   └── page.tsx
│   │   │
│   │   ├── (auth)
│   │   │   ├── sign-in
│   │   │   ├── sign-up
│   │   │   ├── verify
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   │
│   │   ├── api
│   │   │   ├── accept-messages
│   │   │   ├── auth
│   │   │   ├── check-username-unique
│   │   │   ├── delete-message
│   │   │   ├── get-messages
│   │   │   ├── send-message
│   │   │   ├── sign-up
│   │   │   ├── suggest-messages
│   │   │   └── verify-code
│   │   │
│   │   └── u
│   │       └── [username]
│   │           └── page.tsx
│   │
│   ├── favicon.ico
│   ├── globals.css
│   └── layout.tsx
│
├── components
│
├── context
│
├── database
│   └── dbConfig.ts
│
├── lib
│
├── models
│   └── user.model.ts
│
├── schemas
│
├── services
│   ├── ai
│   └── emails
│       ├── sendEmailVerification.ts
│       └── VerificationEmail.tsx
│
├── types
│
├── utils
│   ├── ApiError.ts
│   ├── ApiResponse.ts
│   ├── asyncHandler.ts
│   ├── generateTokens.ts
│   ├── nodemailer.ts
│   └── resend.ts
│
├── messages.json
└── middleware.ts
```

---

# Authentication Flow

```
User Registration
        │
        ▼
Generate OTP
        │
        ▼
Send Verification Email
        │
        ▼
Verify Email
        │
        ▼
Create Account
        │
        ▼
Login
        │
        ▼
Dashboard
```

---

# Anonymous Message Flow

```
Visitor

   │

   ▼

Public Profile

   │

   ▼

Send Anonymous Message

   │

   ▼

API

   │

   ▼

MongoDB

   │

   ▼

Dashboard Inbox
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/Ahmadnaveedofficial/nextApp.git
```

Move into the project

```bash
cd mystery-message
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
MONGODB_URI=

NEXTAUTH_SECRET=

NEXTAUTH_URL=http://localhost:3000

GOOGLE_EMAIL=

GOOGLE_APP_PASSWORD=

OPENAI_API_KEY=
```

Run the development server

```bash
npm run dev
```

---

# API Routes

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/sign-up | Register User |
| POST | /api/verify-code | Verify OTP |
| GET | /api/check-username-unique | Username Validation |
| POST | /api/send-message | Send Anonymous Message |
| GET | /api/get-messages | Fetch Messages |
| DELETE | /api/delete-message/:id | Delete Message |
| GET | /api/accept-messages | Get Accept Status |
| POST | /api/accept-messages | Update Accept Status |
| GET | /api/suggest-messages | AI Suggestions |

---

# Security Features

- JWT Authentication
- Password Hashing (bcrypt)
- Protected Dashboard
- OTP Email Verification
- Route Middleware
- Username Validation
- Zod Input Validation
- Server-side API Validation

---

# Future Improvements

- Real-time messaging
- Message reactions
- Reply system
- Dark/Light mode
- User profile customization
- Rate limiting
- Admin dashboard
- Analytics
- AI moderation
- Image attachments

---

# Learning Outcomes

This project helped strengthen practical experience with:

- Next.js App Router
- Full Stack Development
- REST APIs
- MongoDB & Mongoose
- Authentication & Authorization
- Email Services
- AI Integration
- Form Validation
- TypeScript
- Clean Code Architecture
- Reusable Components
- Responsive UI Design

---

# Contributors

Developed collaboratively by:

- [Ahmad Naveed](https://github.com/Ahmadnaveedofficial)
- [Muhammad Ibraheem](https://github.com/IbraheemxDev)

---

---

# License

This project is created for educational and portfolio purposes.
