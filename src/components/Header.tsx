import { FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FlaskConical className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">FlowTest</h1>
            <p className="text-xs text-muted-foreground">Local-First Testing</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#recorder" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Try Recorder
          </a>
        </nav>

        <Button variant="default" className="bg-primary hover:bg-primary/90">
          Get Started
        </Button>
      </div>
    </header>
  );
};
