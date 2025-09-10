import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Building2,
  Package
} from "lucide-react";

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl mb-2">Asset Health Dashboard</h1>
        <p className="text-muted-foreground text-sm sm:text-base">Overview of all managed assets and their health status</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base">Total Assets</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base">Healthy Assets</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">1,189</div>
            <p className="text-xs text-muted-foreground">
              95.3% of total assets
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base">Needs Attention</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">47</div>
            <p className="text-xs text-muted-foreground">
              3.8% of total assets
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base">Critical Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">11</div>
            <p className="text-xs text-muted-foreground">
              0.9% of total assets
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {[
                { id: "CAGE-045", issue: "Temperature threshold exceeded", time: "2 hours ago", severity: "high" },
                { id: "RACK-B12", issue: "Scheduled maintenance due", time: "5 hours ago", severity: "medium" },
                { id: "SWITCH-C8", issue: "Performance degradation detected", time: "1 day ago", severity: "medium" },
                { id: "CAGE-023", issue: "Connectivity issue resolved", time: "2 days ago", severity: "low" },
              ].map((alert) => (
                <div key={alert.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg gap-3 sm:gap-0">
                  <div className="flex items-start sm:items-center gap-3">
                    <AlertTriangle className={`w-4 h-4 mt-0.5 sm:mt-0 flex-shrink-0 ${
                      alert.severity === "high" ? "text-red-500" : 
                      alert.severity === "medium" ? "text-yellow-500" : "text-green-500"
                    }`} />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm sm:text-base">{alert.id}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground break-words">{alert.issue}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:flex-col sm:items-end sm:text-right">
                    <Badge variant={
                      alert.severity === "high" ? "destructive" : 
                      alert.severity === "medium" ? "secondary" : "outline"
                    } className="text-xs">
                      {alert.severity}
                    </Badge>
                    <p className="text-xs text-muted-foreground sm:mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Asset Locations */}
        <Card>
          <CardHeader>
            <CardTitle>Assets by Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 sm:space-y-5">
              {[
                { location: "London - LS1", total: 423, healthy: 401, issues: 22 },
                { location: "Manchester - MC2", total: 312, healthy: 298, issues: 14 },
                { location: "Birmingham - BM1", total: 267, healthy: 254, issues: 13 },
                { location: "Edinburgh - ED3", total: 245, healthy: 236, issues: 9 },
              ].map((location) => (
                <div key={location.location} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                    <span className="font-medium text-sm sm:text-base">{location.location}</span>
                    <span className="text-muted-foreground text-xs sm:text-sm">{location.total} assets</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(location.healthy / location.total) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                    <span>{location.healthy} healthy</span>
                    <span>{location.issues} need attention</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}