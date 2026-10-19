"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import {
  isLanguageOrder,
  languages,
  translate,
  type Language,
  type LanguageOrder,
} from "@/lib/i18n";

type LocaleContextValue = {
  order: LanguageOrder;
  moveLanguage: (language: Language, direction: -1 | 1) => void;
  t: (key: string, values?: Record<string, string | number>) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);
const storageKey = "crumble-language-priority";
const changeEvent = "crumble-language-priority-change";

function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(changeEvent, listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(changeEvent, listener);
  };
}

function subscribeHydration() {
  return () => {};
}

function getHydratedSnapshot() {
  return true;
}

function getSnapshot() {
  return window.localStorage.getItem(storageKey);
}

function getLanguageOrder(serialized: string | null): LanguageOrder {
  if (serialized) {
    try {
      const parsed: unknown = JSON.parse(serialized);
      if (isLanguageOrder(parsed)) {
        return parsed;
      }
    } catch {
      return [...languages];
    }
  }
  return [...languages];
}

export function LocaleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const hydrated = useSyncExternalStore(subscribeHydration, getHydratedSnapshot, () => false);
  const serialized = useSyncExternalStore(subscribe, getSnapshot, () => null);
  const order = useMemo(
    () => (hydrated ? getLanguageOrder(serialized) : [...languages]),
    [hydrated, serialized],
  );

  useEffect(() => {
    document.documentElement.lang = order[0];
  }, [order]);

  const moveLanguage = useCallback((language: Language, direction: -1 | 1) => {
    const index = order.indexOf(language);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= order.length) {
      return;
    }

    const next = [...order];
    [next[index], next[target]] = [next[target], next[index]];
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    window.dispatchEvent(new Event(changeEvent));
  }, [order]);

  const value = useMemo(
    () => ({
      order,
      moveLanguage,
      t: (key: string, values?: Record<string, string | number>) => translate(order, key, values),
    }),
    [moveLanguage, order],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return value;
}
