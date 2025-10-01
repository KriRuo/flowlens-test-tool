import { FlaskConical, TestTube2, Play, BarChart3, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { title: "Tests", url: "/", icon: TestTube2 },
  { title: "Recorder", url: "/recorder", icon: Play },
  { title: "Results", url: "/results", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export const AppSidebar = () => {
  return (
    <aside className="w-20 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4 gap-6">
      {/* Logo */}
      <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
        <FlaskConical className="w-6 h-6 text-primary-foreground" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.url}
              to={item.url}
              className={({ isActive }) =>
                `w-14 h-14 rounded-lg flex flex-col items-center justify-center gap-1 transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
