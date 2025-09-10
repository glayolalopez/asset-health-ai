import { useState } from "react";
import { ArrowLeft, Save, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface ManualEntryFormProps {
  onBack: () => void;
  onSave: (assetData: any) => void;
}

export function ManualEntryForm({ onBack, onSave }: ManualEntryFormProps) {
  const [formData, setFormData] = useState({
    assetId: "",
    assetType: "",
    location: "",
    description: "",
    serialNumber: "",
    manufacturer: "",
    model: "",
    purchaseDate: "",
    warrantyExpiry: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.assetId.trim()) {
      onSave(formData);
      // Reset form
      setFormData({
        assetId: "",
        assetType: "",
        location: "",
        description: "",
        serialNumber: "",
        manufacturer: "",
        model: "",
        purchaseDate: "",
        warrantyExpiry: ""
      });
    }
  };

  const isFormValid = formData.assetId.trim() && formData.assetType && formData.location;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 sm:gap-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2 flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl">Manual Asset Entry</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Create a new asset record manually</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="assetId">Asset ID *</Label>
                <Input
                  id="assetId"
                  placeholder="e.g., CAGE-001"
                  value={formData.assetId}
                  onChange={(e) => handleInputChange("assetId", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="assetType">Asset Type *</Label>
                <Select value={formData.assetType} onValueChange={(value) => handleInputChange("assetType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select asset type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cage">Cage</SelectItem>
                    <SelectItem value="rack">Rack</SelectItem>
                    <SelectItem value="switch">Switch</SelectItem>
                    <SelectItem value="server">Server</SelectItem>
                    <SelectItem value="router">Router</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., LS1, London"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the asset..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Technical Details */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="serialNumber">Serial Number</Label>
                <Input
                  id="serialNumber"
                  placeholder="Enter serial number"
                  value={formData.serialNumber}
                  onChange={(e) => handleInputChange("serialNumber", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="manufacturer">Manufacturer</Label>
                <Input
                  id="manufacturer"
                  placeholder="e.g., Dell, HP, Cisco"
                  value={formData.manufacturer}
                  onChange={(e) => handleInputChange("manufacturer", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  placeholder="Enter model number"
                  value={formData.model}
                  onChange={(e) => handleInputChange("model", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchaseDate">Purchase Date</Label>
                <Input
                  id="purchaseDate"
                  type="date"
                  value={formData.purchaseDate}
                  onChange={(e) => handleInputChange("purchaseDate", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="warrantyExpiry">Warranty Expiry</Label>
                <Input
                  id="warrantyExpiry"
                  type="date"
                  value={formData.warrantyExpiry}
                  onChange={(e) => handleInputChange("warrantyExpiry", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isFormValid}
            className="w-full sm:w-auto"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Asset
          </Button>
        </div>
      </form>
    </div>
  );
}