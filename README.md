# AssetHealth AI

This repository contains the full codebase for the AssetHealth AI project, a platform for generating intelligent QR code labels for physical assets. The project uses a monorepo structure with an n8n backend and a React frontend.

## 🚀 Getting Started

Follow these instructions to set up and run the complete development environment on your local machine.

### Prerequisites

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/products/docker-desktop/) & Docker Compose
- [Node.js](https://nodejs.org/) (v18 or newer) & npm

### Installation

1.  **Clone the Repository**
    ```sh
    git clone <YOUR_REPOSITORY_URL>
    cd asset-health-ai
    ```

2.  **Launch the Backend (n8n)**
    This command will start the n8n service in a Docker container. The service will be accessible at `http://localhost:5679`.
    ```sh
    cd backend
    docker-compose up -d
    ```

3.  **Launch the Frontend (React UI)**
    This command will install all necessary dependencies and start the Vite development server. The UI will be accessible at `http://localhost:5173`.
    ```sh
    cd ../frontend
    npm install
    npm run dev
    ```

## 🏗️ Project Structure

-   `/backend`: Contains the Docker configuration for our n8n instance.
-   `/backend/workflows_definition`: **This is where you should store exported JSON versions of your n8n workflows for version control.**
-   `/frontend`: Contains the React + Vite + Tailwind CSS application that serves as the user interface.

## 🔄 Workflow Management

**IMPORTANT:** The `backend/n8n_data` directory is ignored by Git for security reasons. To collaborate on workflows, follow this process:

1.  **Export:** After making changes to a workflow in the n8n UI, export it as a JSON file (`File > Download`).
2.  **Save:** Save the JSON file inside the `/backend/workflows_definition/` directory.
3.  **Commit:** Commit the new or updated JSON file to the repository.
4.  **Import:** New team members should import the workflows from this directory into their local n8n instance (`File > Import from File...`).