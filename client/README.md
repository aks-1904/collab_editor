# Collab-Editor: Frontend Client

Welcome to the frontend of **Collab-Editor**, a powerful and intuitive interface for real-time collaborative coding. This React-based application provides users with an interactive environment to code together, manage files, comment inline, and seamlessly communicate with the backend server.

---

## 💻 Technology Stack

The frontend is built using a modern, efficient, and developer-friendly stack:

- **React**: The core library for building user interfaces.
- **TypeScript**: Strongly typed language for more reliable and maintainable code.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development and customization.
- **Redux Toolkit**: Simplified global state management.
- **Redux Persist**: Persists Redux state across sessions (e.g., user auth).
- **Axios**: HTTP client for making API requests to the backend server.
- **React Icons**: Popular icon pack integration for sleek, customizable icons.
- **React Router DOM**: Handles navigation and routing between pages/components.

---

## 🧠 State Management (Redux)

The application uses **Redux Toolkit** to manage global state such as user information, session status, and collaboration metadata. The store is configured in `src/store/` with:

- `userSlice` to manage authentication and user info.
- Redux **persist integration** to store auth sessions across browser reloads.

Custom hooks `useAppDispatch` and `useAppSelector` provide typed access to the Redux store.

---

## 🚀 Getting Started

To set up the frontend locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/aks-1904/collab_editor.git
cd client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The application will run at [http://localhost:5173](http://localhost:5173) by default.

---

## 📁 Project Structure

```
.
├── public/               # Static assets
├── src/
│   ├── assets/           # Images, icons, etc.
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Top-level views/routes
│   │   ├── Home.tsx      # Homepage (/)
│   │   ├── Auth.tsx      # Login/Register page (/auth)
│   │   ├── Dashboard.tsx # Users Dashboard (/dashboard)
│   │   └── Loading.tsx   # Loading screen during lazy loads
│   ├── store/            # Redux store and slices
│   ├── App.tsx           # Root component with routing
│   └── main.tsx          # Entry point
├── index.html
├── package.json
└── tsconfig.json
```

---

## 📄 Available Pages

### `/` Home Page

The landing area where users can:
- View the app's purpose and features
- Access core actions like "Start Collaborating"
- Redirect to authentication if not logged in

### `/auth` Authentication Page

Users can:
- Register a new account
- Log in to an existing account
- Sessions are stored and persisted using Redux + `redux-persist`

### `/dashboard` Dashboard Page
Users can:
- Create a new project
- Can see all project he is in
- Project data stored using Redux

### `Loading` Page

- A full-screen loader shown while routes or heavy components are being fetched.
- Improves UX by providing feedback during delays or lazy loading.

---

## 🧩 Planned Enhancements

- Real-time cursor and selection tracking
- In-editor commenting UI
- File tree explorer and editor tabs
- Theme toggle (light/dark)
- Notifications and collaboration invites

---

## 🤝 Contributing

We welcome contributions! Feel free to open issues or submit pull requests to help improve Collab-Editor.
