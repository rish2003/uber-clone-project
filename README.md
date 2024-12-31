# Project Setup Guide

## Overview
This project uses the following technologies:
- **Frontend**: VITE and React.js
- **Backend**: Node.js

Follow the steps below to set up and run the project.

---

## Prerequisites
Ensure you have the following tools installed:
1. **Node.js** (v14 or later)
2. **npm** (comes with Node.js)
3. **VS Code** (for code editing and port forwarding)

---

## Installation Steps
1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. **Install dependencies**:
   Run the following command in both the `client` and `server` directories:
   ```bash
   npm install
   ```

---

## Running the Project
To run the project, you need to start both the frontend (client) and backend (server) simultaneously.

### 1. Start the Client
Open a terminal in the `client` directory and run:
```bash
npm run dev
```
This will start the VITE development server.

### 2. Start the Server
Open another terminal in the `server` directory and run:
```bash
npx nodemon
```
This will start the Node.js backend server.

---

## Enabling Live Tracking Feature
To enable live tracking, you need to use **Port Forwarding** in VS Code.

### Steps for Port Forwarding:
1. Open VS Code.
2. Go to the **Remote Explorer** tab.
3. Select the ports you want to forward (e.g., the backend server port).
4. Ensure the forwarded ports are accessible from your local browser.

---

## Accessing the Application
1. **Frontend**: Open your browser and navigate to the VITE server URL (usually `http://localhost:5173`).
2. **Backend**: The backend will be running on the configured port (default is often `http://localhost:3000`).

---

## Notes
- Ensure the Google Maps API key is correctly configured in the frontend.
- If any issues arise, check the console logs in both the client and server terminals for debugging information.

---

Happy coding!

