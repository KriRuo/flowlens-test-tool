import { useState } from "react";
import { Play, Square, Save, Eye, Code, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface TestStep {
  id: number;
  action: string;
  selector: string;
  status: "pending" | "passed" | "failed" | "warning";
}

export const TestRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
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
        return <div className="w-4 h-4 rounded-full border-2 border-muted" />;
    }
  };

  const getStatusBg = (status: TestStep["status"]) => {
    switch (status) {
      case "passed":
        return "bg-success/10 border-success/30";
      case "failed":
        return "bg-destructive/10 border-destructive/30";
      case "warning":
        return "bg-warning/10 border-warning/30";
      default:
        return "bg-muted/10 border-border";
    }
  };

  return (
    <section id="recorder" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Test Recorder Interface
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visual mockup of the test recording experience. In production, this connects to Playwright.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="p-6 bg-card border-border">
            {/* Recorder Controls */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
              <div className="flex items-center gap-3">
                <Button
                  variant={isRecording ? "destructive" : "default"}
                  onClick={() => setIsRecording(!isRecording)}
                  className={isRecording ? "" : "bg-primary hover:bg-primary/90"}
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
                
                {isRecording && (
                  <Badge variant="destructive" className="animate-pulse-glow">
                    Recording
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button variant="outline" size="sm">
                  <Code className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>

            {/* Test Steps */}
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Recorded Steps
                </h3>
                <span className="text-sm text-muted-foreground">
                  {steps.length} steps
                </span>
              </div>

              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`p-4 rounded-lg border ${getStatusBg(step.status)} hover:border-primary/50 transition-all duration-200`}
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
                      <code className="text-xs text-muted-foreground font-mono">
                        {step.selector}
                      </code>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Stats */}
            <div className="mt-6 pt-6 border-t border-border grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-success mb-1">3</div>
                <div className="text-xs text-muted-foreground">Passed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning mb-1">1</div>
                <div className="text-xs text-muted-foreground">Warnings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-destructive mb-1">0</div>
                <div className="text-xs text-muted-foreground">Failed</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
