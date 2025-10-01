import { MousePointerClick, RotateCcw, FileCode2, TestTube2, Globe, Download } from "lucide-react";

const features = [
  {
    icon: MousePointerClick,
    title: "Click-to-Record",
    description: "Record user interactions by simply clicking through your app. No coding required for basic test creation.",
  },
  {
    icon: RotateCcw,
    title: "Instant Replay",
    description: "Run recorded tests instantly with Playwright. See exactly what passed or failed with visual feedback.",
  },
  {
    icon: TestTube2,
    title: "Smart Assertions",
    description: "Add assertions for text, visibility, attributes, and more. Validate your UI behaves correctly.",
  },
  {
    icon: Globe,
    title: "Multi-Environment",
    description: "Test across dev, staging, and production. Switch environments with a single click.",
  },
  {
    icon: FileCode2,
    title: "Export as Code",
    description: "Export tests as Playwright scripts. Integrate with CI/CD or customize further in your IDE.",
  },
  {
    icon: Download,
    title: "Local Storage",
    description: "All test data stored locally as JSON. No accounts, no cloud sync, complete privacy.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Everything You Need for UI Testing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed for QA testers, analysts, and developers who value simplicity and control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
