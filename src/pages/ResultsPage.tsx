import { BarChart3, TrendingUp, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

const ResultsPage = () => {
  return (
    <div className="h-full overflow-auto">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <h1 className="text-2xl font-semibold text-foreground">Results</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Test execution history and analytics
        </p>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-5 border border-border bg-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Tests</span>
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold text-foreground">24</div>
            <div className="text-xs text-muted-foreground mt-1">
              +3 this week
            </div>
          </Card>

          <Card className="p-5 border border-border bg-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Passed</span>
              <CheckCircle2 className="w-4 h-4 text-success" />
            </div>
            <div className="text-3xl font-bold text-success">18</div>
            <div className="text-xs text-success mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              75% pass rate
            </div>
          </Card>

          <Card className="p-5 border border-border bg-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Failed</span>
              <XCircle className="w-4 h-4 text-destructive" />
            </div>
            <div className="text-3xl font-bold text-destructive">4</div>
            <div className="text-xs text-muted-foreground mt-1">
              Needs attention
            </div>
          </Card>

          <Card className="p-5 border border-border bg-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Pending</span>
              <Clock className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold text-foreground">2</div>
            <div className="text-xs text-muted-foreground mt-1">
              Not yet run
            </div>
          </Card>
        </div>

        {/* Recent Runs */}
        <Card className="border border-border bg-card">
          <div className="p-5 border-b border-border">
            <h2 className="font-semibold text-foreground">Recent Test Runs</h2>
          </div>
          <div className="divide-y divide-border">
            {[
              { name: "Login Flow - Happy Path", time: "2 hours ago", status: "passed", duration: "2.3s" },
              { name: "Checkout Process", time: "1 day ago", status: "failed", duration: "5.1s" },
              { name: "User Registration", time: "3 days ago", status: "passed", duration: "3.7s" },
              { name: "Search Functionality", time: "5 days ago", status: "passed", duration: "1.9s" },
            ].map((run, i) => (
              <div key={i} className="p-4 hover:bg-muted/20 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {run.status === "passed" ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive" />
                    )}
                    <div>
                      <div className="font-medium text-foreground">{run.name}</div>
                      <div className="text-sm text-muted-foreground">{run.time}</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">{run.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResultsPage;
