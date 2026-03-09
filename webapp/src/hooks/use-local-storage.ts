import { useSyncExternalStore } from "react";
import type { SetStateAction } from "react";

const LOCAL_STORAGE_EVENT = "local-storage";

function getSnapshot(key: string) {
  return localStorage.getItem(key);
}

/**
 * Returns getter and setter that are 'reactive' for local storage value given a keu.
 * NOTE: Do not call the setter with any data that will cause JSON.parse to throw an exception.
 *
 * @param key The localstorage key.
 * @param defaultValue The default value.
 * @returns The value stored in local storage at the specified key, or the defaultValue if localstorage entry is null.
 */
export function useLocalStorage<T>(key: string, defaultValue: T) {
  function subscribe(callback: () => void) {
    const handler = (e: Event) => {
      if ((e as CustomEvent).detail === key) callback();
    };

    window.addEventListener(LOCAL_STORAGE_EVENT, handler);

    return () => {
      window.removeEventListener(LOCAL_STORAGE_EVENT, handler);
    };
  }

  const snapshot = useSyncExternalStore(subscribe, () => getSnapshot(key));
  const value = snapshot === null ? defaultValue : JSON.parse(snapshot);

  const setData = (action: SetStateAction<T>) => {
    const prevSnapshot = getSnapshot(key) ?? undefined;
    const prev = typeof prevSnapshot === "undefined" ? defaultValue : JSON.parse(prevSnapshot);
    const next = typeof action === "function" ? (action as (p: T) => T)(prev) : action;
    localStorage.setItem(key, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(LOCAL_STORAGE_EVENT, { detail: key }));
  };

  return [value, setData] as const;
}
