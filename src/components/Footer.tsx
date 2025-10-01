import { FlaskConical, Github, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/30 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FlaskConical className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">FlowTest</h3>
              <p className="text-xs text-muted-foreground">Local-First UI Testing</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Documentation
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Examples
            </a>
            <a href="#" className="hover:text-foreground transition-colors flex items-center gap-2">
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-destructive fill-current" />
            <span>for testers</span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          <p>© 2025 FlowTest. All data stored locally on your machine.</p>
        </div>
      </div>
    </footer>
  );
};
