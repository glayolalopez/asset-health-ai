// src/pages/ManualEntryPage.tsx
import { ManualEntryForm } from "@/features/asset-management/components/ManualEntryForm";

/**
 * Renders the manual asset entry page.
 */
export default function ManualEntryPage() {
  const handleSubmit = (data: { assetId: string }) => {
    console.log("Submitting asset ID:", data.assetId);
    // Logic to handle the submission, e.g., navigate to the new asset's page
  };

  const handleBack = () => {
    console.log("Navigating back...");
  };

  return <ManualEntryForm onSubmit={handleSubmit} onBack={handleBack} />;
}
