import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { QRScanSection } from "./components/QRScanSection";
import { AssetDetailSection } from "./components/AssetDetailSection";
import { Dashboard } from "./components/Dashboard";
import { ManualEntryForm } from "./components/ManualEntryForm";

type View = "scan" | "details" | "dashboard" | "reports" | "settings" | "manual-entry";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);

  const handleScanComplete = (assetId: string) => {
    setSelectedAssetId(assetId);
    setCurrentView("details");
  };

  const handleReportIssue = () => {
    // In a real app, this would navigate to an issue reporting form
    alert("Report issue functionality would be implemented here");
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view as View);
  };

  const handleBackToScan = () => {
    setCurrentView("scan");
    setSelectedAssetId(null);
  };

  const handleManualEntry = () => {
    setCurrentView("manual-entry");
  };

  const handleSaveAsset = (assetData: any) => {
    // In a real app, this would save the asset to a database
    alert(`Asset ${assetData.assetId} saved successfully!`);
    setCurrentView("scan");
  };

  const renderContent = () => {
    switch (currentView) {
      case "scan":
        return <QRScanSection onScanComplete={handleScanComplete} onManualEntry={handleManualEntry} />;
      case "details":
        return (
          <AssetDetailSection 
            assetId={selectedAssetId || "UNKNOWN"} 
            onReportIssue={handleReportIssue} 
            onBack={handleBackToScan}
          />
        );
      case "manual-entry":
        return (
          <ManualEntryForm 
            onBack={handleBackToScan}
            onSave={handleSaveAsset}
          />
        );
      case "dashboard":
        return <Dashboard />;
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
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentView={currentView} onNavigate={handleNavigate} />
      <main className="flex-1">
        {renderContent()}
      </main>
    </div>
  );
}