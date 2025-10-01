import { MousePointerClick, Settings, Play, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: MousePointerClick,
    number: "01",
    title: "Record Interactions",
    description: "Click through your app normally. FlowTest captures every action, click, and input automatically.",
  },
  {
    icon: Settings,
    number: "02",
    title: "Add Assertions",
    description: "Define what should happen. Check for text, visibility, attributes, or custom conditions.",
  },
  {
    icon: Play,
    number: "03",
    title: "Run Tests",
    description: "Execute tests with Playwright. See results in real-time with visual feedback and logs.",
  },
  {
    icon: CheckCircle,
    number: "04",
    title: "Export & Integrate",
    description: "Export as code for CI/CD or continue testing locally. Your choice, your control.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            How FlowTest Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to reliable, repeatable UI testing
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;
              
              return (
                <div key={index} className="relative">
                  <div className="flex gap-6 items-start">
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      {!isLast && (
                        <div className="absolute top-16 left-8 w-0.5 h-20 bg-gradient-to-b from-primary/50 to-transparent" />
                      )}
                    </div>
                    
                    <div className="flex-1 pt-2">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-primary">
                          {step.number}
                        </span>
                        <h3 className="text-2xl font-semibold text-foreground">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
