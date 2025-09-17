// src/App.tsx
import { useState } from "react";
import { Navigation } from "@/components/common/Navigation";
import DashboardPage from "@/pages/DashboardPage";
import AssetDetailPage from "@/pages/AssetDetailPage";
import QRScanPage from "@/pages/QRScanPage";
import ManualEntryPage from "@/pages/ManualEntryPage";

// Define the possible views/pages in the application.
type View = "dashboard" | "scan" | "details" | "entry" | "reports" | "settings";

/**
 * Main application component.
 * Handles view routing and renders the appropriate page.
 */
export default function App() {
  // State to manage the current active view. Defaults to 'dashboard'.
  const [currentView, setCurrentView] = useState<View>("dashboard");

  /**
   * Handles navigation between different views.
   * @param view The view to navigate to.
   */
  const handleNavigate = (view: string) => {
    setCurrentView(view as View);
  };

  /**
   * Renders the main content based on the current view state.
   */
  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardPage />;
      case "scan":
        return <QRScanPage />;
      case "details":
        return <AssetDetailPage />;
      case "entry":
        return <ManualEntryPage />;
      case "reports":
        return (
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl sm:text-3xl mb-4">Reports</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Reports functionality coming soon...</p>
          </div>
        );
      case "settings":
        return (
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl sm:text-3xl mb-4">Settings</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Settings functionality coming soon...</p>
          </div>
        );
      default:
        // Fallback to the dashboard view.
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* The main navigation component */}
      <Navigation currentView={currentView} onNavigate={handleNavigate} />
      
      {/* The main content area */}
      <main className="flex-1">
        {renderContent()}
      </main>
    </div>
  );
}
