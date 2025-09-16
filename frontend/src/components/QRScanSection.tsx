// /src/components/QRScanSection.tsx

import { useState } from "react";
import { QrCode, Scan, Plus, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface QRScanSectionProps {
  onScanComplete: (assetId: string) => void;
  onManualEntry?: () => void; // Prop opcional para la entrada manual
}

// Un componente SVG reutilizable para indicar estados de carga.
const LoadingSpinner = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export function QRScanSection({ onScanComplete, onManualEntry }: QRScanSectionProps) {
  // Estado para la funcionalidad de Búsqueda Rápida.
  const [quickLookupId, setQuickLookupId] = useState("");

  // --- Lógica para la generación de QR ---
  const [assetId, setAssetId] = useState(''); // Almacena la entrada del usuario para el generador.
  const [isLoading, setIsLoading] = useState<boolean>(false); // Gestiona el estado de carga del formulario.
  const [error, setError] = useState<string | null>(null); // Almacena cualquier mensaje de error.
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null); // Almacena la URL de la imagen del QR generado.

  // URL del webhook de n8n para la generación de códigos QR.
  const N8N_WEBHOOK_URL = "http://localhost:5678/webhook/55f3e5d2-0690-4584-8359-2c21108621bf";

  // Maneja el envío del formulario para generar el QR.
  const handleGenerateQrClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    if (!assetId) {
      setError("El Asset ID no puede estar vacío.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setQrCodeUrl(null);

    try {
      const response = await fetch(`${N8N_WEBHOOK_URL}?assetId=${assetId}`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}. El activo podría no existir.`);
      }
      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setQrCodeUrl(imageUrl);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Manejador para el botón de entrada manual.
  const handleManualEntryClick = () => {
    if (onManualEntry) {
      onManualEntry();
    } else {
      // Fallback si la prop no se proporciona.
      alert("Aquí se abriría el formulario de entrada manual.");
    }
  };

  // Manejador para la búsqueda rápida.
  const handleQuickLookup = () => {
    if (quickLookupId.trim()) {
      onScanComplete(quickLookupId.trim());
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Tarjeta de Escáner QR (sin cambios) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <QrCode className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              Scan QR Code
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="flex justify-center">
              <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                <QrCode className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 text-muted-foreground" />
              </div>
            </div>
            <Button
              onClick={() => onScanComplete("CAGE-001")} // Simula un escaneo exitoso
              className="w-full"
              size="lg"
            >
              <Scan className="w-4 h-4 mr-2" />
              Start Scanning
            </Button>
            <p className="text-muted-foreground text-center text-sm sm:text-base">
              Position the asset QR code within the camera frame to scan automatically
            </p>
          </CardContent>
        </Card>

        {/* Tarjeta de Generación de QR (actualizada con funcionalidad) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              Generate QR Code
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Label htmlFor="assetId" className="text-sm sm:text-base">
                Asset ID
              </Label>
              <Input
                type="text"
                id="assetId"
                name="assetId"
                value={assetId}
                onChange={(e) => setAssetId(e.target.value)}
                className="w-full"
                placeholder="e.g., CAGE-001"
                required
              />
            </div>

            <Button 
              onClick={handleGenerateQrClick}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading && <LoadingSpinner />}
              {isLoading ? 'Generating...' : 'Generate QR'}
            </Button>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-center text-sm">
                <p>{error}</p>
              </div>
            )}

            {qrCodeUrl && (
              <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center space-y-4 animate-fade-in">
                <h3 className="text-sm font-semibold text-foreground">QR Generated Successfully!</h3>
                <img src={qrCodeUrl} alt="Generated QR Code" className="rounded-lg w-32 h-32" />
                <Button asChild size="sm" className="w-full">
                  <a 
                    href={qrCodeUrl} 
                    download={`AssetHealth-QR-${assetId}.png`}
                  >
                    Download Image
                  </a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

      </div>

      {/* Sección de Búsqueda Rápida de Activos */}
      <div className="mt-8 sm:mt-12">
        <Card className="border-2">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-base sm:text-lg">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              Quick Asset Lookup
            </CardTitle>
            <p className="text-muted-foreground text-sm sm:text-base">
              Know the Asset ID? Skip scanning and go directly to asset details.
            </p>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 max-w-lg mx-auto w-full">
            <div className="space-y-2">
              <Label htmlFor="quickLookup" className="text-sm sm:text-base">Asset ID</Label>
              <Input
                id="quickLookup"
                placeholder="Enter Asset ID (e.g., CAGE-001)"
                value={quickLookupId}
                onChange={(e) => setQuickLookupId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleQuickLookup()}
                className="h-10 sm:h-12"
              />
            </div>
            <Button
              onClick={handleQuickLookup}
              className="w-full"
              size="lg"
              disabled={!quickLookupId.trim()}
            >
              <Search className="w-4 h-4 mr-2" />
              Lookup Asset
            </Button>
            <div className="text-center pt-2">
              <button
                onClick={handleManualEntryClick}
                className="text-xs sm:text-sm text-muted-foreground underline hover:text-foreground transition-colors"
              >
                Create New Asset Record
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}