"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

type ThemeMode = "dark" | "light";

type ThemePalette = {
  foreground: string | null;
  background: string | null;
};

type ThemeSettings = {
  mode: ThemeMode;
  palettes: Record<ThemeMode, ThemePalette>;
};

type ThemeContextValue = {
  mode: ThemeMode;
  foreground: string;
  background: string;
  setMode: (mode: ThemeMode) => void;
  setForeground: (color: string) => void;
  setBackground: (color: string) => void;
  reset: () => void;
};

const storageKey = "crumble-theme";
const defaultSettings: ThemeSettings = {
  mode: "dark",
  palettes: {
    dark: { foreground: null, background: null },
    light: { foreground: null, background: null },
  },
};
const defaultSerializedSettings = JSON.stringify(defaultSettings);
const changeEvent = "crumble-theme-change";
const defaultColors = {
  dark: { foreground: "#b9eee9", background: "#041b20" },
  light: { foreground: "#352642", background: "#fcf8ff" },
};
const legacyDefaults = { foreground: "#67e8f9", background: "#08252b" };

const ThemeContext = createContext<ThemeContextValue | null>(null);

function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(changeEvent, listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(changeEvent, listener);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(storageKey) ?? defaultSerializedSettings;
}

function getServerSnapshot() {
  return defaultSerializedSettings;
}

function isHexColor(value: unknown): value is string {
  return typeof value === "string" && /^#[\da-f]{6}$/i.test(value);
}

function isThemePalette(value: unknown): value is ThemePalette {
  return (
    typeof value === "object" &&
    value !== null &&
    "foreground" in value &&
    (value.foreground === null || isHexColor(value.foreground)) &&
    "background" in value &&
    (value.background === null || isHexColor(value.background))
  );
}

function parseSettings(value: string | null): ThemeSettings {
  if (value) {
    try {
      const parsed: unknown = JSON.parse(value);
      if (typeof parsed === "object" && parsed !== null && "mode" in parsed) {
        if (
          (parsed.mode === "dark" || parsed.mode === "light") &&
          "palettes" in parsed &&
          typeof parsed.palettes === "object" &&
          parsed.palettes !== null &&
          "dark" in parsed.palettes &&
          isThemePalette(parsed.palettes.dark) &&
          "light" in parsed.palettes &&
          isThemePalette(parsed.palettes.light)
        ) {
          return {
            mode: parsed.mode,
            palettes: {
              dark: parsed.palettes.dark,
              light: parsed.palettes.light,
            },
          };
        }

        if (
          (parsed.mode === "dark" || parsed.mode === "light") &&
          "foreground" in parsed &&
          isHexColor(parsed.foreground) &&
          "background" in parsed &&
          isHexColor(parsed.background)
        ) {
          const isLegacyDefault =
            parsed.foreground === legacyDefaults.foreground &&
            parsed.background === legacyDefaults.background;
          return {
            ...defaultSettings,
            mode: parsed.mode,
            palettes: {
              ...defaultSettings.palettes,
              [parsed.mode]: {
                foreground: isLegacyDefault ? null : parsed.foreground,
                background: isLegacyDefault ? null : parsed.background,
              },
            },
          };
        }
      }
    } catch {
      return defaultSettings;
    }
  }
  return defaultSettings;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const serializedSettings = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const settings = useMemo(() => parseSettings(serializedSettings), [serializedSettings]);
  const activePalette = settings.palettes[settings.mode];
  const foreground = activePalette.foreground ?? defaultColors[settings.mode].foreground;
  const background = activePalette.background ?? defaultColors[settings.mode].background;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", settings.mode === "dark");
    root.style.colorScheme = settings.mode;
    if (activePalette.background) {
      root.style.setProperty("--background", activePalette.background);
      const tint = settings.mode === "dark" ? "white 5%" : "black 2%";
      const surface = `color-mix(in oklch, ${activePalette.background}, ${tint})`;
      root.style.setProperty("--card", surface);
      root.style.setProperty("--popover", surface);
    } else {
      root.style.removeProperty("--background");
      root.style.removeProperty("--card");
      root.style.removeProperty("--popover");
    }
    if (activePalette.foreground) {
      root.style.setProperty("--foreground", activePalette.foreground);
      root.style.setProperty("--card-foreground", activePalette.foreground);
      root.style.setProperty("--popover-foreground", activePalette.foreground);
    } else {
      root.style.removeProperty("--foreground");
      root.style.removeProperty("--card-foreground");
      root.style.removeProperty("--popover-foreground");
    }
  }, [activePalette, settings.mode]);

  const saveSettings = useCallback((next: ThemeSettings) => {
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    window.dispatchEvent(new Event(changeEvent));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode: settings.mode,
      foreground,
      background,
      setMode: (mode) => saveSettings({ ...settings, mode }),
      setForeground: (foreground) =>
        saveSettings({
          ...settings,
          palettes: {
            ...settings.palettes,
            [settings.mode]: { ...activePalette, foreground },
          },
        }),
      setBackground: (background) =>
        saveSettings({
          ...settings,
          palettes: {
            ...settings.palettes,
            [settings.mode]: { ...activePalette, background },
          },
        }),
      reset: () => {
        window.localStorage.setItem(storageKey, JSON.stringify(defaultSettings));
        window.dispatchEvent(new Event(changeEvent));
      },
    }),
    [activePalette, foreground, saveSettings, settings, background],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeSettings() {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error("useThemeSettings must be used within ThemeProvider");
  }
  return value;
}
