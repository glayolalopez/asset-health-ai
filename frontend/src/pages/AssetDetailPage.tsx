// src/pages/AssetDetailPage.tsx
import { AssetDetail } from "@/features/asset-management/components/AssetDetail";

/**
 * Renders the asset detail page.
 * This component is a simple wrapper around the AssetDetail feature component.
 */
export default function AssetDetailPage() {
  // In a real app, you might fetch data here based on a URL parameter
  // and pass it to the AssetDetail component.
  const assetId = "CAGE-001"; 

  const handleBack = () => {
    // Navigate back to the previous page or dashboard
    console.log("Navigating back...");
  };

  const handleReportIssue = () => {
    // Navigate to the issue reporting page
    console.log("Navigating to report issue page...");
  };

  return (
    <AssetDetail 
      assetId={assetId} 
      onBack={handleBack} 
      onReportIssue={handleReportIssue} 
    />
  );
}
