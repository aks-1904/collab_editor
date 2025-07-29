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

---

# Rate Limiter

Limiting request from a IP to reduce load from server and improve security

```js
// For other apis
apiLimiter = rateLimit({
  windowMs: 15 * 60 * 100, // 15 minutes
  max: 100, // limit each IP to 100 request per window
  standardHeaders: true,
  legacyHeaders: true,
  message: {
    success: false,
    message: "Too many request from this IP address. Try again later",
  },
});

// For authentication apis (login, register)
authLimiter = rateLimit({
  windowMs: 60 * 60 * 100, // 60 minutes
  max: 5, // limit each IP to 5 request per window
  standardHeaders: true,
  legacyHeaders: true,
  message: {
    success: false,
    message: "Too many request to authenticate, try again later",
  },
});
```

---

# Database

### SQL

Sample user table to be created in `mySQL` database

```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY, -- or CHAR(36) for UUIDs
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### MongoDB

Sample project data structure created using `mongoose`

```js
  {
    name: String,
    owner: String, // User id of user from mysql
    members: String[], // Array of user ids
    fileStructure: Schema.Types.Mixed, // File structure can be anything so mixed
    isPublic: Boolean,
    stars: Number
  }
```

Structure to store file or folder data

```ts
// Base Node (for both file and folder)
interface BaseNode {
  id: string;
  name: string;
  type: FileType;
  createdAt: string;
  updatedAt: string;
}

// For Files only
interface FileNode extends BaseNode {
  type: "file";
  content?: string; // Can be null
  language?: string; // Can be null
}

// For Folders only
interface FolderNode extends BaseNode {
  type: "folder";
  children: FileStructureNode[]; // Can include other files or folder
}

interface FilStructureNode = FileNode | FolderNode;
```

---

# Middlewares

`isAuthenticated` Checks if request is from a valid user or not

- Getting token from frontend via header

```ts
const authHeader = req.headers.authorization;
```

- Checking for a valid token should be in format `Bearer <token>`
- If it is valid storing it in a type defined `AuthenticationRequest`

```ts
export interface AuthenticationRequest extends Request {
  id?: string; // User Id
  email?: string; // User mail id
}
```

---

# Apis

## Authentication Api

Make sure to start the server (by default server will run on port 8080)

### 1. Register

Sample `POST` data

```json
{
  "name": "Akshay Sharma",
  "email": "asharma.19042007@gmail.com"
  "password": "securePassword"
}
```

Api response when user created Successfully

```json
{
  success: true,
  message: "Registered successfully",
  token, // JWT Token
  user: { // User Data
    id,
    name,
    email,
  },
}
```

### 2. Login

Sample `POST` data

```json
{
  "email": "asharma.19042007@gmail.com"
  "password": "securePassword"
}
```

Api response when user data is correct

```json
{
  success: true,
  message: "Login successfully",
  token, // JWT Token
  user: { // User Data
    id,
    name,
    email,
  },
}
```

---

## ⚙️ Environment Variables

Your `.env` file configures the application. Ensure all variables are correctly set.

```
# --- Application ---
PORT=8080
FRONTEND_URL=http://localhost:5173
JWT_SECRET=<your_jwt_secret>

# --- Database Credentials ---
MONGO_URI=mongodb://localhost:27017/collab_editor

MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=collab_editor_users

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=<your_redis_password>
```

---

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

---

## 📂 Project Structure

```
.
├── src/
│   ├── config/         # Database connections, CORS, etc.
│   ├── controllers/    # Business logics.
│   ├── middlewares/    # Custom middlewares (e.g., rate limiter)
│   ├── routes/         # HTTP route definitions
│   ├── utils/          # Utilities functions
│   ├── sockets/        # WebSocket event handlers
│   └── index.ts        # Main Express server entry point
├── .env
├── package.json
└── tsconfig.json
```
