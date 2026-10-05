# Resumora — Professional Resume Builder

<p align="center">
  <strong>Build. Customize. Preview. Download.</strong>
</p>

<p align="center">
  A modern full-stack resume builder designed to help students, freshers, and professionals create polished, recruiter-friendly resumes with ease.
</p>

<p align="center">
  <a href="https://resumora-pearl.vercel.app/">Live Demo</a>
  ·
  <a href="#features">Features</a>
  ·
  <a href="#tech-stack">Tech Stack</a>
  ·
  <a href="#getting-started">Getting Started</a>
</p>

---

## 🚀 Overview

**Resumora** is a full-stack web application that makes professional resume creation simple and accessible.

Instead of manually designing a resume from scratch, users can create an account, choose a professionally designed template, enter their career information, preview the resume in real time, manage multiple resume versions, and export the final resume as **PDF or editable DOCX**.

The application is built with a modern **React + Vite frontend** and a **Node.js + Express backend**, with **Prisma ORM** for persistent data management.

### 🌐 Live Application

**[Open Resumora →](https://resumora-pearl.vercel.app/)**

---

## ✨ Features

### 🔐 Authentication

- User registration and login
- JWT-based authentication
- Access and refresh token architecture
- Secure password hashing with bcrypt
- Cookie-based refresh token sessions
- Session persistence and revocation
- Google OAuth authentication
- Microsoft OAuth integration
- Protected application routes

### 📝 Resume Builder

- Create multiple resumes
- Edit resume information
- Rename resumes
- Duplicate existing resumes
- Delete resumes
- Persistent resume storage
- Organized resume workspace
- Auto-saving/editing workflow
- Structured sections for professional information

### 📄 Resume Sections

Resumora supports the major sections required for a professional resume:

- Personal Information
- Professional Title
- Professional Summary
- Education
- Skills
- Projects
- Work Experience
- Positions & Leadership
- Achievements
- GitHub
- LinkedIn
- Portfolio
- Contact Information

### 🎨 Professional Templates

Choose from multiple professionally designed layouts:

| Template | Best For |
| --- | --- |
| **Minimal** | Students, freshers, and modern professionals |
| **Executive** | Experienced professionals and corporate roles |
| **Modern Creative** | Developers, designers, and creative professionals |

The templates focus on readability, structured information hierarchy, and professional presentation.

### 👀 Live Resume Preview

- Real-time resume preview
- A4-oriented layout
- Edit and preview workflow
- Template switching
- Resume content updates reflected immediately
- Designed to resemble the final printable document

### 📥 Export

Users can export their completed resume as:

- **PDF**
- **DOCX / Microsoft Word**

The PDF generation also preserves clickable links such as:

- GitHub
- LinkedIn
- Portfolio
- Email
- Other supported URLs

### 📊 Resume Dashboard

The personal dashboard allows users to manage all their resumes from one place.

Available actions include:

- Create
- Edit
- View
- Rename
- Duplicate
- Delete

Each resume also stores its selected template and last updated timestamp.

---

## 🛠️ Tech Stack

### Frontend

- **React.js** — UI development
- **Vite** — Frontend build tooling
- **JavaScript**
- **React Router** — Client-side routing
- **Zustand** — State management
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — UI animations
- **Lucide React** — Icons
- **Axios** — API communication

### Resume Generation

- **jsPDF** — PDF generation
- **html2pdf.js** — HTML-to-PDF conversion
- **docx** — DOCX generation
- **html-docx-js-typescript** — HTML to Word document conversion

### Backend

- **Node.js**
- **Express.js**
- **REST API**
- **JWT**
- **bcrypt**
- **Cookie Parser**
- **Express Validator**
- **Passport.js**
- **Google OAuth**
- **Microsoft OAuth**

### Database

- **PostgreSQL**
- **Prisma ORM**

### Development & Deployment

- **Git**
- **GitHub**
- **VS Code**
- **npm**
- **Vercel**

---

## 🏗️ Architecture

Resumora follows a separated frontend/backend architecture.

```text
                         ┌──────────────────────┐
                         │      Resumora UI     │
                         │   React + Vite       │
                         └──────────┬───────────┘
                                    │
                                    │ REST API
                                    ▼
                         ┌──────────────────────┐
                         │   Express Backend    │
                         │      Node.js         │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
              Authentication    Resume API     OAuth Providers
                    │               │          Google / Microsoft
                    │               │
                    └───────┬───────┘
                            ▼
                    ┌──────────────────┐
                    │   Prisma ORM     │
                    └────────┬─────────┘
                             ▼
                    ┌──────────────────┐
                    │   PostgreSQL     │
                    └──────────────────┘
```

---

## 📁 Project Structure

```text
Resume-main/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── templates/
│   │   │   │   ├── Minimal.jsx
│   │   │   │   ├── Executive.jsx
│   │   │   │   └── ModernCreative.jsx
│   │   │   │
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ResumePreview.jsx
│   │   │   └── ScrollToTop.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── AuthPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Builder.jsx
│   │   │   ├── Templates.jsx
│   │   │   ├── About.jsx
│   │   │   ├── PrivacyPolicy.jsx
│   │   │   ├── TermsOfService.jsx
│   │   │   └── OAuthCallback.jsx
│   │   │
│   │   ├── store/
│   │   │   ├── authStore.js
│   │   │   └── resumeStore.js
│   │   │
│   │   ├── config/
│   │   │   └── msalConfig.js
│   │   │
│   │   ├── app.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
├── backend/
│   │
│   ├── config/
│   │   └── passport.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── resumeController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   └── resume.js
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   │
│   ├── prismaClient.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

## 🔑 Authentication Flow

Resumora uses a token-based authentication architecture.

### Email & Password

```text
User
  │
  ▼
Register / Login
  │
  ▼
Express Authentication API
  │
  ├── Password verification
  ├── JWT access token
  └── Refresh token session
          │
          ▼
       Database
```

### OAuth

The application also supports OAuth-based authentication through:

- Google
- Microsoft

OAuth requests are handled through the backend and connected to the application's user/session system.

---

## 🗄️ Database Design

The application uses PostgreSQL with Prisma ORM.

### Main Models

#### User

Stores account information.

```text
User
├── id
├── name
├── username
├── email
├── passwordHash
├── avatar
├── createdAt
└── updatedAt
```

#### Resume

Stores each user's resume.

```text
Resume
├── id
├── userId
├── title
├── template
├── resumeData
├── createdAt
└── updatedAt
```

#### OAuthAccount

Connects external OAuth providers with application users.

```text
OAuthAccount
├── provider
├── providerAccountId
└── userId
```

#### Session

Stores refresh-token session information.

```text
Session
├── userId
├── tokenHash
├── expiresAt
├── createdAt
└── revokedAt
```

---

## 🔌 REST API

The backend exposes RESTful endpoints for authentication and resume management.

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
POST /api/auth/google
POST /api/auth/microsoft
```

### OAuth

```http
GET /api/auth/google
GET /api/auth/google/callback

GET /api/auth/microsoft
GET /api/auth/microsoft/callback
```

### Resumes

```http
GET    /api/resumes
POST   /api/resumes
GET    /api/resumes/:id
PUT    /api/resumes/:id
POST   /api/resumes/:id/duplicate
DELETE /api/resumes/:id
```

All resume management routes are protected by authentication middleware.

---

## ⚙️ Getting Started

Follow these steps to run Resumora locally.

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd Resume-main
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd backend
npm install
```

---

## 🔐 Environment Variables

### Backend

Create:

```text
backend/.env
```

Example:

```env
PORT=5001
CLIENT_URL=http://localhost:5173

DATABASE_URL=your_postgresql_connection_string

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

MICROSOFT_CLIENT_ID=your_microsoft_client_id
MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret
MICROSOFT_TENANT_ID=common
```

### Frontend

Create:

```text
frontend/.env
```

Example:

```env
VITE_API_URL=http://localhost:5001/api

VITE_GOOGLE_CLIENT_ID=your_google_client_id

VITE_MICROSOFT_CLIENT_ID=your_microsoft_client_id
VITE_MICROSOFT_TENANT_ID=common
```

> Never commit `.env` files or private OAuth secrets to GitHub.

---

## 🧬 Database Setup

After configuring your PostgreSQL database:

```bash
cd backend
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

For production environments:

```bash
npx prisma migrate deploy
```

---

## ▶️ Run the Application

### Start Backend

```bash
cd backend
npm run dev
```

The backend will run on:

```text
http://localhost:5001
```

### Start Frontend

In another terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

Open the application in your browser:

```text
http://localhost:5173
```

---

## 🧪 Production Build

Build the frontend:

```bash
cd frontend
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## ☁️ Deployment

The frontend is configured for deployment with **Vercel**.

A typical production setup looks like:

```text
                 Internet
                     │
                     ▼
          ┌────────────────────┐
          │     Vercel         │
          │  React + Vite App  │
          └─────────┬──────────┘
                    │
                    │ API Requests
                    ▼
          ┌────────────────────┐
          │ Express Backend    │
          │ Node.js            │
          └─────────┬──────────┘
                    │
                    ▼
          ┌────────────────────┐
          │ PostgreSQL         │
          │ Prisma             │
          └────────────────────┘
```

### Production Environment

Make sure the following are configured correctly:

- Production API URL
- PostgreSQL connection string
- JWT secrets
- Google OAuth credentials
- Microsoft OAuth credentials
- OAuth callback URLs
- CORS allowed origin
- Frontend environment variables

---

## 🎯 Design Goals

Resumora was designed around a few core principles:

### Simplicity

Resume creation should not require complicated design tools.

### Professional Presentation

Templates are designed to maintain clean typography, spacing, hierarchy, and readability.

### Fast Editing

Users should be able to enter information and immediately see how their resume looks.

### Multiple Versions

Users can maintain different resumes for different jobs, roles, or career paths.

### Practical Export

The final resume should be available in commonly used formats such as PDF and DOCX.

---

## 🔮 Future Improvements

Potential improvements for future versions include:

- AI-powered resume suggestions
- AI-generated professional summaries
- Job-description based resume optimization
- ATS score analysis
- Keyword matching
- More resume templates
- Drag-and-drop section ordering
- Custom color and typography controls
- Resume analytics
- Public resume sharing
- Custom resume URLs
- Cloud file storage
- Email-based resume sharing
- LinkedIn profile import
- Improved mobile editing experience

---

## 🧠 What This Project Demonstrates

This project demonstrates practical full-stack development skills including:

- React application architecture
- Component-based UI development
- Client-side routing
- Global state management
- REST API design
- Authentication & authorization
- JWT-based sessions
- OAuth integration
- Database modeling
- Prisma ORM
- PostgreSQL
- PDF generation
- DOCX generation
- Responsive UI development
- Environment configuration
- Frontend/backend deployment
- Production-oriented application structure

---

## 📸 Application Flow

```text
Landing Page
     │
     ▼
Register / Login
     │
     ▼
Dashboard
     │
     ├───────────────┐
     │               │
     ▼               ▼
Create Resume    Existing Resume
     │               │
     └───────┬───────┘
             ▼
        Resume Builder
             │
       ┌─────┼─────┐
       │     │     │
       ▼     ▼     ▼
      Edit  Preview Template
             │
             ▼
        Export Resume
          │       │
          ▼       ▼
         PDF     DOCX
```

---

## 🔒 Security Notes

The project follows several security-oriented practices:

- Passwords are hashed before storage.
- Protected API routes require authentication.
- Resume ownership is checked before allowing modifications.
- Refresh tokens are stored as hashed session records.
- OAuth credentials are managed through environment variables.
- Sensitive environment files are excluded from Git.
- CORS is configured for allowed application origins.

> Production deployments should always use strong secrets, HTTPS, secure cookie settings, restricted CORS origins, and properly configured OAuth redirect URLs.

---

## 🌐 Live Demo

Try the deployed application:

**[https://resumora-pearl.vercel.app/](https://resumora-pearl.vercel.app/)**

---

## 👨‍💻 Author

**Hrithik Kumar**

Full-Stack Developer focused on building practical web applications with modern JavaScript technologies.

- GitHub: [@ritikkumar-07](https://github.com/ritikkumar-07)
- LinkedIn: [Ritik Kumar](https://www.linkedin.com/in/ritik-kumar-b56580411/)

---

## ⭐ Support

If you find Resumora useful or interesting:

- ⭐ Star the repository
- 🍴 Fork the project
- 🐛 Report issues
- 💡 Suggest improvements
- 🤝 Contribute to the project

---

<p align="center">
  Built with React, Node.js, Express, Prisma and PostgreSQL.
</p>

<p align="center">
  <strong>Resumora — Build a resume that represents you.</strong>
</p>
