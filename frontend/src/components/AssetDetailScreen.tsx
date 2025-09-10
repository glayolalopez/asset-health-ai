import { AlertTriangle, CheckCircle, MapPin, Settings, Calendar, Brain, ArrowLeft, Package } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

interface AssetDetailScreenProps {
  onReportIssue: () => void;
  onBack: () => void;
}

export function AssetDetailScreen({ onReportIssue, onBack }: AssetDetailScreenProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-2 h-8 w-8"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1>Asset Details – CAGE-001</h1>
          </div>
          
          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
              Healthy
            </Badge>
          </div>
        </div>

        {/* Asset Information Sections */}
        <div className="space-y-4">
          {/* Predicted Life Cycle */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Settings className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <h3 className="mb-2">Predicted Life Cycle</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">2.5 years remaining</span>
                      <span className="text-muted-foreground">50%</span>
                    </div>
                    <Progress value={50} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>0 years</span>
                      <span>5 years total</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="mb-1">Location</h3>
                  <p className="text-muted-foreground">LS1, London</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Type */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Settings className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="mb-1">Type</h3>
                  <p className="text-muted-foreground">Cage</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Count */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="mb-1">Assets Remaining</h3>
                  <p className="text-muted-foreground">7 units in stock</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Last Maintenance */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="mb-1">Last Maintenance</h3>
                  <p className="text-muted-foreground">30 Aug 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendation */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="mb-1">AI Recommendation</h3>
                  <p className="text-muted-foreground">No action needed at this time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Issue Button */}
        <div className="pt-4">
          <Button 
            onClick={onReportIssue}
            variant="outline"
            className="w-full h-12"
            size="lg"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Report an Issue
          </Button>
        </div>
      </div>
    </div>
  );
}