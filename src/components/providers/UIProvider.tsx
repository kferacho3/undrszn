"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { getProduct, products } from "@/data/catalog";

export interface BagLine {
  product: string;
  size: string;
  qty: number;
}

export type DialogState =
  | { kind: "bag" }
  | { kind: "menu" }
  | { kind: "size"; productId?: string }
  | { kind: "zoom"; assetId: string }
  | { kind: "newsletter" }
  | { kind: "checkout" }
  | null;

interface UIContextValue {
  lines: BagLine[];
  count: number;
  subtotal: number;
  addLine: (product: string, size: string) => boolean;
  changeQty: (index: number, delta: number) => void;
  removeLine: (index: number) => void;
  dialog: DialogState;
  openDialog: (d: Exclude<DialogState, null>) => void;
  closeDialog: () => void;
  toast: (message: string) => void;
  toastMessage: string;
  bagPulse: number;
}

const STORAGE_KEY = "undrszn-preview-bag-v1";
export const MAX_QTY = 9;

const UIContext = createContext<UIContextValue | null>(null);

function sanitize(value: unknown): BagLine[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (l): l is BagLine =>
      !!l &&
      typeof l === "object" &&
      products.some((p) => p.id === l.product && p.sizes.includes(l.size)) &&
      Number.isInteger(l.qty) &&
      l.qty > 0 &&
      l.qty <= MAX_QTY,
  );
}

export function UIProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<BagLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [dialog, setDialog] = useState<DialogState>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [bagPulse, setBagPulse] = useState(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const toast = useCallback((message: string) => {
    setToastMessage(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(""), 3600);
  }, []);

  // Restore the anonymous preview bag after hydration (never during SSR).
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time restore from browser storage
      setLines(sanitize(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")));
    } catch {
      /* storage blocked: bag lasts for this visit only */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, hydrated]);

  const addLine = useCallback(
    (product: string, size: string) => {
      const existing = lines.find((l) => l.product === product && l.size === size);
      if (existing && existing.qty >= MAX_QTY) {
        toast(`Quantities are limited to ${MAX_QTY} per size.`);
        return false;
      }
      setLines((prev) => {
        const idx = prev.findIndex((l) => l.product === product && l.size === size);
        if (idx === -1) return [...prev, { product, size, qty: 1 }];
        return prev.map((l, i) => (i === idx ? { ...l, qty: l.qty + 1 } : l));
      });
      setBagPulse((n) => n + 1);
      return true;
    },
    [lines, toast],
  );

  const changeQty = useCallback((index: number, delta: number) => {
    setLines((prev) =>
      prev
        .map((l, i) => (i === index ? { ...l, qty: Math.min(MAX_QTY, Math.max(0, l.qty + delta)) } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const removeLine = useCallback((index: number) => {
    setLines((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const value = useMemo<UIContextValue>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + (getProduct(l.product)?.price ?? 0) * l.qty, 0);
    return {
      lines,
      count,
      subtotal,
      addLine,
      changeQty,
      removeLine,
      dialog,
      openDialog: setDialog,
      closeDialog: () => setDialog(null),
      toast,
      toastMessage,
      bagPulse,
    };
  }, [lines, addLine, changeQty, removeLine, dialog, toast, toastMessage, bagPulse]);

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
}
