🌱 Plantory -   Mobile Social Network for Plant Lovers
Plantory is a specialized mobile social network platform designed for plant enthusiasts. It bridges the gap left by generalist social networks by providing a dedicated space for urban gardeners and collectors to showcase their collections, exchange tips, and grow a community.

📖 Table of Contents
1. Project Vision

2. Features

3. Tech Stack

4. Architecture & Database

5. Project Structure

6. Security & Performance

7. Installation & Setup

8. API Endpoints

1. Project Vision
Context: Urban gardening and indoor plant collecting are surging, yet information remains dispersed across general platforms.

Target Audience: Plant hobbyists and collectors aged 18-65.

Goal: A centralized hub to document plant growth, discover new species, and build meaningful social connections.

2. Features
👤 User Management
Secure Auth: Registration, Login (JWT), and Password Reset.

Profile: Custom avatars, bio management, and statistics (followers/following).

🌿 Social Feed & Posts
Creation: Capture via camera or upload from gallery with detailed plant descriptions.

Personalized Feed: Algorithmic display of posts from users you follow.

Interactions: Like/Unlike posts and threaded commenting system.

🔍 Discovery
Search: Find other users and experts.

Categories: Filter content by plant types (Sukkulents, Tropical, etc.).

3. Tech Stack
Backend (REST API)
Runtime: Node.js (v18+)

Framework: Express.js

Database: PostgreSQL (v15+)

ORM: Sequelize (Configured with Migrations & Seeders)

Validation: Zod

Storage: Multer (Local/Cloud storage for images)

Frontend (Mobile)
Framework: React Native with Expo (v50+)

Navigation: Expo Router (File-based routing)

State: Zustand (Global state management)

Networking: Axios

4. Architecture & Database
System Design
The application follows a standard Client-Server architecture with a RESTful API gateway.

Database Model (3rd Normal Form)
The relational schema ensures data integrity and performance:

Users: Core user data and credentials.

Posts: Image URLs and captions (Many-to-One with User).

Comments & Likes: Engagement join tables.

Follows: Self-referencing table for the social graph.

5. Project Structure
Bash

plantory/
├── backend/                 # Node.js / Express API
│   ├── src/
│   │   ├── config/          # Sequelize & Environment setup
│   │   ├── controllers/     # Request handlers (logic)
│   │   ├── middlewares/     # Auth, Upload, Rate-limiting
│   │   ├── models/          # Sequelize Schema Definitions
│   │   ├── routes/          # API Route definitions
│   │   └── services/        # Reusable business logic
│   ├── database/
│   │   ├── migrations/      # DB Schema versioning
│   │   └── seeders/         # Initial demo data
│   └── app.js               # Server entry point
│
└── mobile/                  # React Native / Expo App
    ├── app/                 # Expo Router (auth) and (tabs) groups
    ├── components/          # Reusable UI (PlantCard, Buttons)
    ├── services/            # Axios API instances
    ├── stores/              # Zustand (Auth/Feed stores)
    └── hooks/               # Custom React hooks
6. Security & Performance
Security Measures
Bcrypt: Password hashing (10 salt rounds).

JWT Strategy: 15-minute Access Tokens and 7-day Refresh Tokens stored in Expo SecureStore.

Helmet: Secure HTTP headers for the API.

Rate Limiting: Protection against brute-force attacks.

Performance KPIs
API Latency: < 500ms (p95).

Uptime: > 99% availability.

Tests: > 70% code coverage.

Mobile: < 3s initial load time.

7. Installation & Setup
Prerequisites
Node.js (v18+)

PostgreSQL

Expo Go app (for mobile testing)

Backend Installation
Navigate to backend/ and run npm install.

Configure .env with your PostgreSQL credentials.

Run migrations: npx sequelize-cli db:migrate.

Start server: npm run dev.

Mobile Installation
Navigate to mobile/ and run npm install.

Start Expo: npx expo start.

Scan the QR code with your mobile device.

API Endpoints

Method,Endpoint,Description
POST,/api/auth/register,Create a new account
POST,/api/auth/login,Returns Access & Refresh tokens
GET,/api/posts,Retrieve the social feed
POST,/api/posts,Upload new plant photo/caption
POST,/api/users/:id/follow,Follow/Unfollow a user


