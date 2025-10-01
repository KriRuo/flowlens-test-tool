import { BarChart3, TrendingUp, CheckCircle2, XCircle, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { LoadingCard } from "@/components/LoadingCard";
import { useAsyncOperation } from "@/hooks/useAsyncOperation";
import { TestService, type TestRun } from "@/services/testService";

const ResultsPage = () => {
  const [stats, setStats] = useState({
    total: 0,
    passed: 0,
    failed: 0,
    pending: 0,
  });
  const [recentRuns, setRecentRuns] = useState<TestRun[]>([]);

  const { isLoading, execute } = useAsyncOperation({
    successMessage: "Results loaded successfully",
    errorMessage: "Failed to load results",
  });

  const loadData = async () => {
    await execute(async () => {
      const [statsData, runsData] = await Promise.all([
        TestService.getTestStats(),
        TestService.getTestRuns(),
      ]);
      
      setStats(statsData);
      setRecentRuns(runsData.slice(0, 4)); // Show only recent 4 runs
      
      return { stats: statsData, runs: runsData };
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const formatDuration = (ms: number): string => {
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const formatTimeAgo = (timestamp: string): string => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  if (isLoading) {
    return (
      <div className="h-full overflow-auto">
        {/* Header */}
        <div className="border-b border-border bg-card px-6 py-4">
          <h1 className="text-2xl font-semibold text-foreground">Results</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Test execution history and analytics
          </p>
        </div>

        {/* Loading State */}
        <div className="p-6">
          <LoadingCard message="Loading results..." />
        </div>
      </div>
    );
  }

  const passRate = stats.total > 0 ? Math.round((stats.passed / stats.total) * 100) : 0;

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
            <div className="text-3xl font-bold text-foreground">{stats.total}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Active tests
            </div>
          </Card>

          <Card className="p-5 border border-border bg-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Passed</span>
              <CheckCircle2 className="w-4 h-4 text-success" />
            </div>
            <div className="text-3xl font-bold text-success">{stats.passed}</div>
            <div className="text-xs text-success mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {passRate}% pass rate
            </div>
          </Card>

          <Card className="p-5 border border-border bg-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Failed</span>
              <XCircle className="w-4 h-4 text-destructive" />
            </div>
            <div className="text-3xl font-bold text-destructive">{stats.failed}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {stats.failed > 0 ? "Needs attention" : "All good"}
            </div>
          </Card>

          <Card className="p-5 border border-border bg-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Pending</span>
              <Clock className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold text-foreground">{stats.pending}</div>
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
            {recentRuns.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No test runs yet
                </h3>
                <p className="text-sm text-muted-foreground">
                  Run some tests to see results here
                </p>
              </div>
            ) : (
              recentRuns.map((run) => (
                <div key={run.id} className="p-4 hover:bg-muted/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {run.status === "passed" ? (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      ) : (
                        <XCircle className="w-5 h-5 text-destructive" />
                      )}
                      <div>
                        <div className="font-medium text-foreground">
                          Test Run {run.id}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatTimeAgo(run.timestamp)}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatDuration(run.duration)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResultsPage;
