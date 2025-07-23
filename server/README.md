# Collab-Editor: Backend Server

Welcome to the backend server for Collab-Editor, a real-time collaborative coding environment designed to bring teams closer together, no matter where they are. This server powers the core functionality, enabling seamless, real-time synchronization of code, comments, and project structures.

## ✨ Core Features

- **Real-Time Collaboration**: Users can join a project and see live edits from their teammates,.
- **Intelligent File Locking**: To prevent merge conflicts, the system automatically locks a file when a user starts editing. Other team members can view the file in read-only mode and see the changes as they happen.
- **Take Control Requests**: A user can request control of a locked file, which sends a notification to the current editor, ensuring a smooth handover.
- **In-File Commenting**: Leave comments directly within the code to ask questions, suggest changes, or provide feedback.
- **Live Project Explorer**: Any changes to the project's file and folder structure are instantly synced and visible to all collaborators.
- **Built with TypeScript**: A robust and type-safe codebase for enhanced reliability and developer experience.

## 🚀 Getting Started

Follow these instructions to get the backend server up and running on your local machine for development and testing.

### 1. Clone the Repository

```bash
git clone https://github.com/aks-1904/collab_editor.git
cd server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the project root by copying the example file.

```bash
cp .env.example .env
```

Next, open the `.env` file and fill in the required values.

### 4. Run the Server

To start the server in development mode with auto-reloading:

```bash
npm run dev
```

For a production build:

```bash
npm run build
npm start
```

You should see the following when everything is connected properly:

```
✅ MongoDB connected successfully.
✅ MySQL connected successfully.
✅ Redis connected successfully.

🎉 Server listening on http://localhost:3000
```

## ⚙️ Environment Variables

Your `.env` file configures the application. Ensure all variables are correctly set.

```
# --- Application ---
PORT=8080
FRONTEND_URL=http://localhost:5173

# --- Database Credentials ---
MONGO_URI=mongodb://localhost:27017/collab_editor

MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=collab_editor_users

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```

## 💻 Technology Stack

This server leverages a modern and powerful stack to handle real-time demands:

- **Framework**: Express.js
- **Language**: TypeScript
- **Real-Time Communication**: WebSockets (likely with a library like Socket.IO)
- **Databases**:
  - **MongoDB**: Stores document and project data.
  - **MySQL**: Manages user authentication and relational data.
  - **Redis**: Handles ephemeral state like file locks, cursors, and presence.
- **Frontend**: React with TypeScript.
- **Security**: `cors` for resource sharing and `express-rate-limit` for protecting sensitive endpoints.

## 📂 Project Structure

```
.
├── src/
│   ├── config/         # Database connections, CORS, etc.
│   ├── middlewares/    # Custom middlewares (e.g., rate limiter)
│   ├── routes/         # HTTP route definitions
│   ├── sockets/        # WebSocket event handlers
│   └── index.ts        # Main Express server entry point
├── .env
├── package.json
└── tsconfig.json
```
