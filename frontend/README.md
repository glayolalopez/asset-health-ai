# Asset Health AI

This project is a web application for monitoring and managing asset health. It consists of a user interface (frontend) developed with React and a workflow automation backend using n8n, all managed with Docker.

## Architecture

The project is divided into two main components:

-   **/frontend**: A Single Page Application (SPA) built with Vite, React, and TypeScript, which provides the user interface for interacting with asset data.
-   **/backend**: An n8n service configured via Docker Compose to handle workflows, business logic, and automation.

## Features

-   **Asset Dashboard**: Visualize the overall status of assets through charts and tables.
-   **Asset Detail**: A detailed view with all relevant information for a specific asset.
-   **Manual Entry**: Forms for registering new assets or updating existing information.
-   **QR Scanner**: Functionality to scan QR codes and quickly access asset details.

## Tech Stack

-   **Frontend**:
    -   React
    -   Vite
    -   TypeScript
    -   Tailwind CSS
    -   [shadcn/ui](https://ui.shadcn.com/) (UI components)
    -   Recharts (charts)
-   **Backend**:
    -   n8n (Workflow Engine)
    -   Docker

## Getting Started

Follow these steps to set up the complete development environment.

### Prerequisites

-   Node.js (v18 or higher)
-   npm
-   Docker and Docker Compose

### 1. Start the Backend

The backend uses n8n to manage workflows.

```bash
# Navigate to the backend directory
cd backend

# Start the n8n service with Docker Compose
docker-compose up -d
```

Once started, the n8n UI will be available at [http://localhost:5678](http://localhost:5678).

### 2. Start the Frontend

The user interface is a Vite application.

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The web application will be available at [http://localhost:5173](http://localhost:5173) (or whichever port Vite indicates in the console).