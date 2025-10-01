import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const SettingsPage = () => {
  return (
    <div className="h-full overflow-auto">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configure your testing environment
        </p>
      </div>

      {/* Content */}
      <div className="p-6 max-w-3xl">
        <div className="space-y-6">
          {/* General Settings */}
          <Card className="p-6 border border-border bg-card">
            <h2 className="text-lg font-semibold text-foreground mb-4">General</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workspace">Workspace Name</Label>
                <Input
                  id="workspace"
                  placeholder="My Workspace"
                  defaultValue="FlowTest Workspace"
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="storage">Storage Location</Label>
                <Input
                  id="storage"
                  placeholder="/path/to/tests"
                  defaultValue="~/Documents/FlowTest"
                  className="bg-background"
                />
                <p className="text-xs text-muted-foreground">
                  Local directory where test files are saved
                </p>
              </div>
            </div>
          </Card>

          {/* Test Execution */}
          <Card className="p-6 border border-border bg-card">
            <h2 className="text-lg font-semibold text-foreground mb-4">Test Execution</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Headless Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Run tests without opening browser window
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-Save Tests</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically save tests after recording
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Screenshot on Failure</Label>
                  <p className="text-sm text-muted-foreground">
                    Capture screenshot when test fails
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeout">Default Timeout (ms)</Label>
                <Input
                  id="timeout"
                  type="number"
                  defaultValue="30000"
                  className="bg-background"
                />
              </div>
            </div>
          </Card>

          {/* Environments */}
          <Card className="p-6 border border-border bg-card">
            <h2 className="text-lg font-semibold text-foreground mb-4">Environments</h2>
            <div className="space-y-3">
              {["Development", "Staging", "Production"].map((env) => (
                <div key={env} className="space-y-2">
                  <Label>{env}</Label>
                  <Input
                    placeholder={`https://${env.toLowerCase()}.example.com`}
                    className="bg-background"
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="bg-primary hover:bg-primary/90">
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
