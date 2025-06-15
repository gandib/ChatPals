# ChatPals

## Introduction

A comprehensive ChatPals built with Vite, TypeScript, AntDesign, Redux, Socket.io, Tailwind CSS and some required packages. This web app allows users to chat multiple friends with realtime and with responsive design.

## Features

- **Home Page:** Browse and search users by email to create mutual chat connections.
- **Dashboard:** See user information, and update profile.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Technology Stack

**Frontend:**

- Vite
- TypeScript
- Redux
- Socket.io
- Tailwind CSS
- AntDesign
- React Router
- Sonner
- React Hook Form

**Backend:**

- Node.js
- Express
- TypeScript
- Socket.io
- Mongoose
- AWS(EC2)
- CI/CD Pipeline
- Cloudinary

## Installation Guideline

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/gandib/ChatPals
   cd ChatPals
   git clone https://github.com/gandib/chatpals-server
   cd chatpals-server
   ```

2. **Install dependencies:**

   **Frontend:**

   ```bash
   cd ChatPals
   npm install
   ```

   **Backend:**

   ```bash
   cd chatpals-server
   npm install
   ```

3. **Configuration:**

   Create a `.env` file in the root directory of both the frontend and backend projects and add the necessary configuration variables.

   **Frontend .env:**

   ```env
   VITE_BASE_API=https://chatpals-server.duckdns.org
   ```

   **Backend .env:**

   ```env
   PORT=5000
   DB_URL=your_mongodb_connection_uri
   ```

4. **Run the project:**

   **Frontend:**

## Usage

1. **Access the website:**
   Open your web browser and navigate to Live client site `https://chat-pals.vercel.app`. and live backend site `https://chatpals-server.duckdns.org`
