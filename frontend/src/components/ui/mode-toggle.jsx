import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { useTheme } from "./themeProvider";

export function ModeToggleIcon() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="h-8 w-8 p-0 cursor-pointer relative"
    >
      <Sun className={`h-4 w-4 transition-all ${isDark ? "scale-0 rotate-90" : "scale-100 rotate-0"}`} />
      <Moon className={`absolute h-4 w-4 transition-all ${isDark ? "scale-100 rotate-0" : "scale-0 -rotate-90"}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export function ModeToggleFull() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center w-full gap-1 rounded-lg bg-muted p-1">
      <button
        onClick={() => setTheme("light")}
        className={`px-3 py-1.5 text-sm font-medium w-full rounded-md transition-colors cursor-pointer ${
          theme === "light"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Light
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`px-3 py-1.5 text-sm font-medium w-full rounded-md transition-colors cursor-pointer ${
          theme === "dark"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Dark
      </button>
    </div>
  );
}