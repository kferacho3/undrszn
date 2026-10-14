"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Icon } from "./Icon";

interface ModalProps {
  title: string;
  onClose: () => void;
  variant?: "default" | "drawer" | "drawer-left" | "lightbox";
  children: ReactNode;
}

/** Native <dialog>: focus trapping, Escape and inert background come from the platform. */
export function Modal({ title, onClose, variant = "default", children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<Element | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    opener.current = document.activeElement;
    if (!dialog.open) dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      if (dialog.open) dialog.close();
      const el = opener.current as HTMLElement | null;
      if (el && document.contains(el)) el.focus({ preventScroll: true });
    };
  }, []);

  const variantClass =
    variant === "drawer" ? "dialog--drawer" : variant === "drawer-left" ? "dialog--drawer dialog--left" : variant === "lightbox" ? "dialog--lightbox" : "";

  return (
    <dialog
      ref={ref}
      className={`dialog ${variantClass}`}
      aria-labelledby="dialog-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        // Click on the backdrop (outside the dialog box) closes it.
        if (e.target !== ref.current) return;
        const r = ref.current.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) onClose();
      }}
    >
      <div className="dialog__head">
        <h2 id="dialog-title">{title}</h2>
        <button className="icon-btn" onClick={onClose} aria-label="Close">
          <Icon name="close" />
        </button>
      </div>
      <div className="dialog__body">{children}</div>
    </dialog>
  );
}
