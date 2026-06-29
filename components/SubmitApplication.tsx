"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Button from "@/components/Button";
import ApplyForm from "@/components/ApplyForm";

export default function SubmitApplication({
  variant = "primary",
  children = "Submit Your Application →",
}: {
  variant?: "primary" | "secondary" | "accent";
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const modal = (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-navy-950/70 backdrop-blur-sm p-4"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Submit your application"
    >
      <div
        className="relative bg-white rounded-2xl shadow-xl w-full max-w-[680px] max-h-[90vh] flex flex-col overflow-hidden"
        style={{ animation: "applyIn 260ms cubic-bezier(0.22, 1, 0.36, 1) both" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (fixed, centered) */}
        <div className="shrink-0 relative px-12 pt-8 pb-6 border-b border-navy-100 text-center">
          <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-gold-700">
            Application
          </span>
          <h2 className="font-display font-extrabold text-[26px] text-navy-900 leading-[1.15] mt-2">
            Submit your application
          </h2>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute top-5 right-5 w-9 h-9 rounded-full border border-navy-200 text-navy-500 hover:bg-navy-50 hover:text-navy-900 transition-colors flex items-center justify-center text-[20px] leading-none"
          >
            ×
          </button>
        </div>

        {/* Body (scrolls inside the popup) */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <ApplyForm onClose={() => setOpen(false)} />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Button variant={variant} size="lg" onClick={() => setOpen(true)}>
        {children}
      </Button>
      {open && typeof document !== "undefined"
        ? createPortal(modal, document.body)
        : null}
    </>
  );
}
