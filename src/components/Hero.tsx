import { Play, Code2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
            <Shield className="w-4 h-4" />
            <span>100% Local • No Cloud Required</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            UI Testing Made
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow">
              Simple & Local
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Record, replay, and manage UI tests with Playwright. All data stays on your machine. 
            No cloud. No complexity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
              <Play className="w-5 h-5" />
              Try Test Recorder
            </Button>
            <Button size="lg" variant="outline" className="border-border hover:bg-card gap-2">
              <Code2 className="w-5 h-5" />
              View Examples
            </Button>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: "🎯", label: "Click-to-Record", desc: "Capture interactions instantly" },
            { icon: "⚡", label: "Fast Replay", desc: "Run tests in seconds" },
            { icon: "🔒", label: "Fully Local", desc: "Your data never leaves" }
          ].map((item, i) => (
            <div 
              key={i}
              className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-foreground mb-2">{item.label}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
