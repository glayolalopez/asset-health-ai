import { 
  AlertTriangle, 
  CheckCircle, 
  MapPin, 
  Settings, 
  Calendar, 
  Brain, 
  Package,
  ArrowLeft,
  Edit,
  History,
  Download
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

interface AssetDetailSectionProps {
  assetId: string;
  onBack: () => void;
  onReportIssue: () => void;
}

export function AssetDetailSection({ assetId, onBack, onReportIssue }: AssetDetailSectionProps) {
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-2 flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl break-words">Asset Details – {assetId}</h1>
              <p className="text-muted-foreground text-sm sm:text-base">Last updated: 2 minutes ago</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" className="flex-shrink-0">
              <History className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">View History</span>
              <span className="sm:hidden">History</span>
            </Button>
            <Button variant="outline" size="sm" className="flex-shrink-0">
              <Download className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Export Report</span>
              <span className="sm:hidden">Export</span>
            </Button>
            <Button variant="outline" size="sm" className="flex-shrink-0">
              <Edit className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Edit Asset</span>
              <span className="sm:hidden">Edit</span>
            </Button>
          </div>
        </div>
        
        {/* Status Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0" />
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 text-sm sm:text-base lg:text-lg px-2 py-1 sm:px-3">
              Healthy
            </Badge>
          </div>
          <span className="text-muted-foreground text-sm sm:text-base">All systems operational</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Asset Information */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Predicted Life Cycle */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                Predicted Life Cycle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                  <span className="text-base sm:text-lg">2.5 years remaining</span>
                  <span className="text-base sm:text-lg font-medium">50%</span>
                </div>
                <Progress value={50} className="h-2 sm:h-3" />
                <div className="flex flex-col sm:flex-row sm:justify-between text-sm sm:text-base text-muted-foreground gap-1 sm:gap-0">
                  <span>Installed: Sep 2020</span>
                  <span>Expected EOL: Sep 2025</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Brain className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                AI Recommendation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-base sm:text-lg">No action needed at this time</p>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Based on current performance metrics and historical data, this asset is operating within normal parameters. 
                  Continue with scheduled maintenance as planned.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="outline" className="text-xs sm:text-sm">Confidence: 94%</Badge>
                  <Badge variant="outline" className="text-xs sm:text-sm">Next Review: Oct 15</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Information */}
        <div className="space-y-4 sm:space-y-6">
          {/* Basic Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Asset Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm sm:text-base font-medium">Location</h4>
                  <p className="text-muted-foreground text-sm sm:text-base">LS1, London</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm sm:text-base font-medium">Type</h4>
                  <p className="text-muted-foreground text-sm sm:text-base">Cage</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Package className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm sm:text-base font-medium">Assets Remaining</h4>
                  <p className="text-muted-foreground text-sm sm:text-base">7 units in stock</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm sm:text-base font-medium">Last Maintenance</h4>
                  <p className="text-muted-foreground text-sm sm:text-base">30 Aug 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3">
              <Button 
                onClick={onReportIssue}
                variant="outline"
                className="w-full justify-start text-sm sm:text-base"
                size="sm"
              >
                <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
                Report an Issue
              </Button>
              
              <Button 
                variant="outline"
                className="w-full justify-start text-sm sm:text-base"
                size="sm"
              >
                <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                Schedule Maintenance
              </Button>
              
              <Button 
                variant="outline"
                className="w-full justify-start text-sm sm:text-base"
                size="sm"
              >
                <Settings className="w-4 h-4 mr-2 flex-shrink-0" />
                Update Configuration
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}