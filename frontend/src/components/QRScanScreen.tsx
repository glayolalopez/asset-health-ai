import { QrCode } from "lucide-react";
import { Button } from "./ui/button";

interface QRScanScreenProps {
  onScanComplete: () => void;
}

export function QRScanScreen({ onScanComplete }: QRScanScreenProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        {/* Title */}
        <div className="text-center">
          <h1 className="mb-2">Scan Asset QR Code</h1>
        </div>

        {/* QR Code Scanner Placeholder */}
        <div className="flex justify-center">
          <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
            <QrCode className="w-16 h-16 text-muted-foreground" />
          </div>
        </div>

        {/* Scan Button */}
        <div className="space-y-4">
          <Button 
            onClick={onScanComplete}
            className="w-full h-12"
            size="lg"
          >
            Scan Now
          </Button>

          {/* Manual Entry Link */}
          <div className="text-center">
            <button 
              className="text-primary hover:underline"
              onClick={onScanComplete}
            >
              Enter Asset ID manually
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}