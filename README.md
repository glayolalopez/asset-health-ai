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

## Asset Lifecycle Prediction Model

This project incorporates a machine learning model to provide data-driven predictions about asset longevity.

-   **Function**: The model, built using a `RandomForestRegressor`, analyzes historical data (such as asset type, manufacturer, and age) to predict two key metrics:
    1.  **Predicted Life Expectancy**: The total estimated lifespan of an asset from its installation date.
    2.  **Predicted Remaining Life**: The estimated number of years left until an asset reaches its end-of-life.

-   **Execution**: The prediction model is not run manually. It is executed automatically by an **n8n bot** as part of a backend workflow whenever detailed asset information is requested. The bot runs the underlying Python scripts and integrates the prediction results into the data sent to the frontend.

-   **Documentation**: For a comprehensive technical breakdown of the model, including its architecture, performance metrics (MAE, RMSE, R²), and feature analysis, please refer to the full documentation.

    **It is highly recommended to read the detailed document located at: `Asset Lifecycle Prediction Model/Predictive Model for Asset Lifecycle Management.md`**

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
Once started, the n8n UI will be available at http://localhost:5678.
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

The web application will be available at http://localhost:5173 (or whichever port Vite indicates in the console).
