import { Plus, Search, MoreVertical, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Test {
  id: string;
  name: string;
  steps: number;
  lastRun: string;
  status: "passed" | "failed" | "pending";
  environment: string;
}

const mockTests: Test[] = [
  {
    id: "1",
    name: "Login Flow - Happy Path",
    steps: 8,
    lastRun: "2 hours ago",
    status: "passed",
    environment: "staging",
  },
  {
    id: "2",
    name: "Checkout Process",
    steps: 15,
    lastRun: "1 day ago",
    status: "failed",
    environment: "production",
  },
  {
    id: "3",
    name: "User Registration",
    steps: 12,
    lastRun: "3 days ago",
    status: "passed",
    environment: "dev",
  },
  {
    id: "4",
    name: "Search Functionality",
    steps: 6,
    lastRun: "Never",
    status: "pending",
    environment: "staging",
  },
];

const getStatusIcon = (status: Test["status"]) => {
  switch (status) {
    case "passed":
      return <CheckCircle2 className="w-4 h-4 text-success" />;
    case "failed":
      return <XCircle className="w-4 h-4 text-destructive" />;
    default:
      return <Clock className="w-4 h-4 text-muted-foreground" />;
  }
};

const getStatusBadge = (status: Test["status"]) => {
  const variants = {
    passed: "bg-success/10 text-success border-success/20",
    failed: "bg-destructive/10 text-destructive border-destructive/20",
    pending: "bg-muted text-muted-foreground border-border",
  };
  return variants[status];
};

const TestsPage = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Tests</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage and run your UI tests
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            New Test
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search tests..."
            className="pl-10 bg-background"
          />
        </div>
      </div>

      {/* Test List */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid gap-4">
          {mockTests.map((test) => (
            <Card
              key={test.id}
              className="p-5 hover:shadow-md transition-shadow cursor-pointer border border-border bg-card"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1">{getStatusIcon(test.status)}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground mb-1">
                      {test.name}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{test.steps} steps</span>
                      <span>•</span>
                      <span>Last run: {test.lastRun}</span>
                      <span>•</span>
                      <Badge variant="outline" className="text-xs">
                        {test.environment}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={getStatusBadge(test.status)}>
                    {test.status}
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestsPage;
