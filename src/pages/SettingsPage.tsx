import { Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { settingsSchema, defaultSettings, type SettingsFormData } from "@/schemas/settings";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: defaultSettings,
  });

  const onSubmit = async (data: SettingsFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would save to localStorage or send to API
      localStorage.setItem('flowtest-settings', JSON.stringify(data));
      
      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* General Settings */}
            <Card className="p-6 border border-border bg-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">General</h2>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="workspace"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workspace Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="My Workspace"
                          className="bg-background"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="storage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Storage Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="/path/to/tests"
                          className="bg-background"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-xs text-muted-foreground">
                        Local directory where test files are saved
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>

            {/* Test Execution */}
            <Card className="p-6 border border-border bg-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Test Execution</h2>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="headlessMode"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Headless Mode</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Run tests without opening browser window
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="autoSave"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Auto-Save Tests</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Automatically save tests after recording
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="screenshotOnFailure"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Screenshot on Failure</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Capture screenshot when test fails
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeout"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Timeout (ms)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="bg-background"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>

            {/* Environments */}
            <Card className="p-6 border border-border bg-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Environments</h2>
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="environments.development"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Development</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://dev.example.com"
                          className="bg-background"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="environments.staging"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Staging</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://staging.example.com"
                          className="bg-background"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="environments.production"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Production</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com"
                          className="bg-background"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Saving..." : "Save Settings"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SettingsPage;
