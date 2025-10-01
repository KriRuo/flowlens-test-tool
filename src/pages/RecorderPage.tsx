import { useState } from "react";
import { Play, Square, Save, Trash2, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface TestStep {
  id: number;
  action: string;
  selector: string;
  status: "pending" | "passed" | "failed" | "warning";
}

const RecorderPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [testName, setTestName] = useState("New Test");
  const [steps, setSteps] = useState<TestStep[]>([
    { id: 1, action: "Navigate to https://example.com", selector: "page.goto()", status: "passed" },
    { id: 2, action: "Click button 'Login'", selector: "button[data-testid='login-btn']", status: "passed" },
    { id: 3, action: "Fill input 'Email'", selector: "input[type='email']", status: "passed" },
    { id: 4, action: "Assert text contains 'Welcome'", selector: "h1.welcome-message", status: "warning" },
  ]);

  const getStatusIcon = (status: TestStep["status"]) => {
    switch (status) {
      case "passed":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-destructive" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-warning" />;
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />;
    }
  };

  const getStatusBg = (status: TestStep["status"]) => {
    switch (status) {
      case "passed":
        return "bg-success/5 border-success/20 hover:bg-success/10";
      case "failed":
        return "bg-destructive/5 border-destructive/20 hover:bg-destructive/10";
      case "warning":
        return "bg-warning/5 border-warning/20 hover:bg-warning/10";
      default:
        return "bg-muted/20 border-border hover:bg-muted/30";
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 flex-1">
            <Input
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              className="max-w-md text-lg font-semibold bg-background"
            />
            {isRecording && (
              <Badge variant="destructive" className="animate-pulse">
                Recording
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant={isRecording ? "destructive" : "default"}
            onClick={() => setIsRecording(!isRecording)}
            className={!isRecording ? "bg-primary hover:bg-primary/90" : ""}
          >
            {isRecording ? (
              <>
                <Square className="w-4 h-4 mr-2" />
                Stop Recording
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Recording
              </>
            )}
          </Button>
          
          <div className="text-sm text-muted-foreground">
            {steps.length} steps recorded
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="flex-1 overflow-auto p-6">
        {steps.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <Play className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No steps recorded yet
              </h3>
              <p className="text-sm text-muted-foreground">
                Click "Start Recording" and interact with your application to record test steps
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2 max-w-4xl mx-auto">
            {steps.map((step) => (
              <Card
                key={step.id}
                className={`p-4 border transition-all ${getStatusBg(step.status)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getStatusIcon(step.status)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-muted-foreground">
                        Step {step.id}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {step.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground mb-1">{step.action}</p>
                    <code className="text-xs text-muted-foreground font-mono break-all">
                      {step.selector}
                    </code>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Stats Footer */}
      {steps.length > 0 && (
        <div className="border-t border-border bg-card px-6 py-3">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span className="text-foreground font-medium">3 Passed</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-warning" />
              <span className="text-foreground font-medium">1 Warning</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-destructive" />
              <span className="text-foreground font-medium">0 Failed</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecorderPage;
