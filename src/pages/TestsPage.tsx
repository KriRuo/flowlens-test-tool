import { Plus, Search, MoreVertical, CheckCircle2, XCircle, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LoadingCard } from "@/components/LoadingCard";
import { useAsyncOperation } from "@/hooks/useAsyncOperation";
import { TestService, type Test } from "@/services/testService";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [tests, setTests] = useState<Test[]>([]);
  
  const { isLoading, execute } = useAsyncOperation({
    successMessage: "Tests loaded successfully",
    errorMessage: "Failed to load tests",
  });

  // Load tests from service
  const loadTests = async () => {
    await execute(async () => {
      const tests = await TestService.getTests();
      setTests(tests);
      return tests;
    });
  };

  // Load tests on mount
  useEffect(() => {
    loadTests();
  }, []);

  const filteredTests = tests.filter(test =>
    test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    test.environment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewTest = async () => {
    await execute(async () => {
      const newTest = await TestService.createTest({
        name: "New Test",
        steps: 0,
        lastRun: "Never",
        status: "pending",
        environment: "dev",
      });
      setTests(prev => [newTest, ...prev]);
      return newTest;
    }, {
      successMessage: "New test created",
      errorMessage: "Failed to create new test",
    });
  };

  if (isLoading && tests.length === 0) {
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
            <Button className="bg-primary hover:bg-primary/90" disabled>
              <Plus className="w-4 h-4 mr-2" />
              New Test
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search tests..."
              className="pl-10 bg-background"
              disabled
            />
          </div>
        </div>

        {/* Loading State */}
        <div className="flex-1 overflow-auto p-6">
          <LoadingCard message="Loading tests..." />
        </div>
      </div>
    );
  }

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
          <Button 
            className="bg-primary hover:bg-primary/90"
            onClick={handleNewTest}
            disabled={isLoading}
          >
            <Plus className="w-4 h-4 mr-2" />
            {isLoading ? "Creating..." : "New Test"}
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search tests..."
            className="pl-10 bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Test List */}
      <div className="flex-1 overflow-auto p-6">
        {filteredTests.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {searchQuery ? "No tests found" : "No tests yet"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery 
                ? "Try adjusting your search terms"
                : "Create your first test to get started"
              }
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredTests.map((test) => (
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
        )}
      </div>
    </div>
  );
};

export default TestsPage;
