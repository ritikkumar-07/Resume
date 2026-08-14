# ResumeBuilder

A full-stack web application for creating, managing, previewing, and downloading professional resumes.

## Overview

ResumeBuilder allows users to create professional resumes using customizable resume templates. Users can create an account, log in securely, manage their resumes, edit resume information, preview the final result, and download the resume as a PDF.

The project is built with a React frontend and a Node.js/Express backend, with Prisma and SQLite used for persistent data storage.

## Features

- User registration and login
- Secure password hashing
- JWT-based authentication
- Session management
- Create and edit resumes
- Multiple resume templates
- Resume preview
- Resume data persistence
- Download resume as PDF
- Responsive resume builder interface
- GitHub, LinkedIn and portfolio links
- Education, skills, projects and experience sections
- Resume management through the dashboard

## Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- REST APIs
- JWT Authentication
- bcrypt
- Cookie-based session handling

### Database

- SQLite
- Prisma ORM

### Development Tools

- Git
- GitHub
- VS Code
- npm

## Project Structure

```text
ResumeBuilder/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── dev.db
│   ├── prismaClient.js
│   ├── server.js
│   ├── test.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md