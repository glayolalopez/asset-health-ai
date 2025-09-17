// src/pages/QRScanPage.tsx
import { QRScanner } from "@/features/asset-management/components/QRScanner";

/**
 * Renders the QR scanner page.
 * This component wraps the QRScanner feature, handling navigation logic.
 */
export default function QRScanPage() {
  const handleScanComplete = (assetId: string) => {
    // Navigate to the asset detail page for the scanned ID
    console.log(`Scan complete. Navigating to asset: ${assetId}`);
  };

  const handleManualEntry = () => {
    // Navigate to the manual entry page
    console.log("Navigating to manual entry page...");
  };

  return (
    <QRScanner 
      onScanComplete={handleScanComplete} 
      onManualEntry={handleManualEntry} 
    />
  );
}
