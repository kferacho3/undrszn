"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";

interface FieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "url" | "textarea" | "select";
  required?: boolean;
  full?: boolean;
  autoComplete?: string;
  options?: string[];
  placeholder?: string;
}

export function Field({ label, name, type = "text", required = true, full = false, autoComplete, options, placeholder }: FieldProps) {
  const id = `f-${name}`;
  const errId = `${id}-err`;
  const common = {
    id,
    name,
    required,
    "aria-describedby": errId,
    onInput: (e: FormEvent<HTMLElement>) => {
      const el = e.currentTarget as HTMLInputElement;
      if (el.getAttribute("aria-invalid") === "true" && el.checkValidity()) {
        el.removeAttribute("aria-invalid");
        const err = document.getElementById(errId);
        if (err) err.textContent = "";
      }
    },
  };
  return (
    <div className={`field ${full ? "field--full" : ""}`}>
      <label htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </label>
      {type === "textarea" ? (
        <textarea {...common} maxLength={3000} placeholder={placeholder} />
      ) : type === "select" ? (
        <select {...common} defaultValue="">
          <option value="">Select a topic</option>
          {options?.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input {...common} type={type} maxLength={300} autoComplete={autoComplete} placeholder={placeholder} />
      )}
      <span className="field__error" id={errId} aria-live="polite" />
    </div>
  );
}

function messageFor(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): string {
  if (el.validity.valueMissing) return el.type === "checkbox" ? "Please confirm to continue." : "This field is required.";
  if (el.validity.typeMismatch && el.type === "email") return "Enter an email address like name@example.com.";
  if (el.validity.typeMismatch && el.type === "url") return "Enter a full link, starting with https://";
  return el.validationMessage;
}

/**
 * Accessible validation for forms that are not yet connected to a delivery service.
 * Nothing is sent or stored; production must post to an approved destination and only
 * show success after that service accepts the submission.
 */
export function PreviewForm({ children, submitLabel, consentLabel }: { children: ReactNode; submitLabel: string; consentLabel: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current!;
    const controls = Array.from(form.elements).filter(
      (el): el is HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement =>
        el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement,
    );
    let firstInvalid: HTMLElement | null = null;
    for (const el of controls) {
      const err = el.getAttribute("aria-describedby") ? document.getElementById(el.getAttribute("aria-describedby")!) : null;
      if (!el.checkValidity()) {
        el.setAttribute("aria-invalid", "true");
        if (err) err.textContent = messageFor(el);
        firstInvalid ??= el;
      } else {
        el.removeAttribute("aria-invalid");
        if (err) err.textContent = "";
      }
    }
    if (firstInvalid) {
      setStatus("");
      firstInvalid.focus();
      return;
    }
    setStatus("Form checked. Nothing was sent and no personal information was stored. This form is not connected yet.");
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  return (
    <form ref={formRef} className="form-fields" noValidate onSubmit={onSubmit}>
      {children}
      <div className="field field--full">
        <label className="check">
          <input type="checkbox" name="consent" required aria-describedby="f-consent-err" />
          {consentLabel}
        </label>
        <span className="field__error" id="f-consent-err" aria-live="polite" />
      </div>
      <button className="btn btn--red" type="submit">
        {submitLabel} <span className="arrow" aria-hidden="true">↗</span>
      </button>
      <div className="form-status" role="status" tabIndex={-1} ref={statusRef}>
        {status}
      </div>
    </form>
  );
}
