"use client";

import { useState } from "react";
import { getBrowserClient, BUCKET } from "@/lib/supabaseBrowser";

const MAX_BYTES = 50 * 1024 * 1024; // 50 MB

type Status = "idle" | "submitting" | "success" | "error";

interface Fields {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  website: string;
  founded: string;
  legalStructure: string;
  location: string;
  capitalRaised: string;
  currentAsk: string;
  videoUrl: string;
}

const empty: Fields = {
  firstName: "",
  lastName: "",
  companyName: "",
  email: "",
  phone: "",
  website: "",
  founded: "",
  legalStructure: "",
  location: "",
  capitalRaised: "",
  currentAsk: "",
  videoUrl: "",
};

const labelCls = "block text-[13px] font-semibold text-navy-800 mb-[6px]";
const inputCls =
  "w-full px-3.5 py-2.5 text-[15px] text-navy-900 bg-white border border-navy-200 rounded-lg outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 transition";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelCls}>
        {label}
        {required && <span className="text-gold-600"> *</span>}
      </label>
      {children}
    </div>
  );
}

function FileField({
  label,
  required,
  accept,
  file,
  onPick,
}: {
  label: string;
  required?: boolean;
  accept: string;
  file: File | null;
  onPick: (f: File | null) => void;
}) {
  return (
    <Field label={label} required={required}>
      <label className="flex items-center gap-3 px-3.5 py-3 border-2 border-dashed border-navy-200 rounded-lg cursor-pointer hover:border-gold-400 hover:bg-gold-50/40 transition">
        <span className="shrink-0 w-8 h-8 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-gold-600" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 16V4" /><path d="M7 9l5-5 5 5" /><path d="M5 20h14" />
          </svg>
        </span>
        <span className={`text-[14px] truncate ${file ? "text-navy-900 font-medium" : "text-navy-500"}`}>
          {file ? file.name : "Choose a file…"}
        </span>
        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => onPick(e.target.files?.[0] ?? null)}
        />
      </label>
    </Field>
  );
}

export default function ApplyForm({ onClose }: { onClose: () => void }) {
  const [f, setF] = useState<Fields>(empty);
  const [hp, setHp] = useState(""); // honeypot
  const [application, setApplication] = useState<File | null>(null);
  const [deck, setDeck] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((prev) => ({ ...prev, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Validation
    if (!f.firstName.trim() || !f.lastName.trim() || !f.companyName.trim() || !f.email.trim()) {
      setError("Please fill in your name, company, and email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!application || !deck) {
      setError("Please attach both your completed application and pitch deck.");
      return;
    }
    for (const file of [application, deck]) {
      if (file.size > MAX_BYTES) {
        setError(`"${file.name}" is larger than 50 MB. Please upload a smaller file.`);
        return;
      }
    }

    setStatus("submitting");
    try {
      // 1) Get signed upload URLs
      const signRes = await fetch("/api/apply/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          files: [
            { field: "application", name: application.name },
            { field: "deck", name: deck.name },
          ],
        }),
      });
      if (!signRes.ok) throw new Error("Could not prepare the upload.");
      const { uploads } = await signRes.json();

      // 2) Upload each file straight to Supabase
      const supabase = getBrowserClient();
      const byField: Record<string, File> = { application, deck };
      const filesPayload: { field: string; path: string; filename: string }[] = [];
      for (const u of uploads) {
        const file = byField[u.field];
        const { error: upErr } = await supabase.storage
          .from(BUCKET)
          .uploadToSignedUrl(u.path, u.token, file);
        if (upErr) throw new Error(`Upload failed for ${file.name}.`);
        filesPayload.push({ field: u.field, path: u.path, filename: file.name });
      }

      // 3) Submit the record
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, hp, files: filesPayload }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError((err as Error).message || "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="px-9 py-14 text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-7 h-7 text-gold-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="font-display font-extrabold text-[24px] text-navy-900 mt-5">
          Application received
        </h3>
        <p className="text-[15px] leading-[1.6] text-navy-600 mt-3 max-w-[400px] mx-auto">
          Thank you. We review every application and will be in touch within two
          weeks.
        </p>
        <button
          onClick={onClose}
          className="mt-7 inline-flex items-center justify-center h-11 px-7 text-[14px] font-bold tracking-[0.03em] uppercase text-white bg-navy-900 rounded hover:bg-navy-800 transition-colors"
        >
          Done
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="px-9 py-7">
      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        className="hidden"
        aria-hidden="true"
      />

      <div className="space-y-7">
        {/* About you */}
        <div>
          <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-gold-700 mb-4">
            About you
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="First name" required>
              <input className={inputCls} value={f.firstName} onChange={set("firstName")} />
            </Field>
            <Field label="Last name" required>
              <input className={inputCls} value={f.lastName} onChange={set("lastName")} />
            </Field>
            <Field label="Email" required>
              <input type="email" className={inputCls} value={f.email} onChange={set("email")} />
            </Field>
            <Field label="Phone">
              <input className={inputCls} value={f.phone} onChange={set("phone")} />
            </Field>
          </div>
        </div>

        {/* Your company */}
        <div>
          <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-gold-700 mb-4">
            Your company
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Company name" required>
              <input className={inputCls} value={f.companyName} onChange={set("companyName")} />
            </Field>
            <Field label="Website">
              <input className={inputCls} value={f.website} onChange={set("website")} placeholder="https://" />
            </Field>
            <Field label="Founded">
              <input className={inputCls} value={f.founded} onChange={set("founded")} placeholder="e.g. 2025" />
            </Field>
            <Field label="Legal structure">
              <input className={inputCls} value={f.legalStructure} onChange={set("legalStructure")} placeholder="e.g. Delaware C-Corp" />
            </Field>
            <Field label="Location">
              <input className={inputCls} value={f.location} onChange={set("location")} />
            </Field>
            <Field label="Capital raised to date">
              <input className={inputCls} value={f.capitalRaised} onChange={set("capitalRaised")} />
            </Field>
            <div className="col-span-2">
              <Field label="Current round / ask">
                <input className={inputCls} value={f.currentAsk} onChange={set("currentAsk")} />
              </Field>
            </div>
          </div>
        </div>

        {/* Your submission */}
        <div>
          <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-gold-700 mb-4">
            Your submission
          </h3>
          <div className="space-y-4">
            <FileField
              label="Completed application"
              required
              accept=".pdf,.doc,.docx"
              file={application}
              onPick={setApplication}
            />
            <FileField
              label="Pitch deck"
              required
              accept=".pdf,.ppt,.pptx"
              file={deck}
              onPick={setDeck}
            />
            <Field label="Video link">
              <input
                className={inputCls}
                value={f.videoUrl}
                onChange={set("videoUrl")}
                placeholder="Drive, YouTube (unlisted), or Loom link"
              />
            </Field>
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-5 text-[14px] text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <div className="mt-7 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={submitting}
          className="h-11 px-5 text-[14px] font-semibold text-navy-700 hover:text-navy-900 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center h-11 px-7 text-[14px] font-bold tracking-[0.03em] uppercase text-navy-900 bg-gold-600 rounded hover:bg-gold-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Submitting…" : "Submit Application →"}
        </button>
      </div>
    </form>
  );
}
