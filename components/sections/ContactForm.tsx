"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

const fields = [
  { name: "firstName", label: "First name", type: "text", autoComplete: "given-name", half: true },
  { name: "lastName", label: "Last name", type: "text", autoComplete: "family-name", half: true },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject", type: "text", autoComplete: "off" },
] as const;

const input =
  "meta mt-2 h-11 w-full border border-white/15 bg-white/5 px-3 normal-case text-white outline-none transition-colors placeholder:text-white/35 focus:border-white/60";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "");
    if (!String(data.get("firstName") ?? "").trim() || !String(data.get("message") ?? "").trim()) {
      setError("Please add your name and a message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setSent(true);
  };

  if (sent) {
    return (
      <div role="status" className="py-16 text-center">
        <p className="display-md">Thank you.</p>
        <p className="copy mt-4 text-white/70">A real person will reply within two working days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid grid-cols-2 gap-x-3 gap-y-5">
      {fields.map((f) => (
        <label key={f.name} className={`eyebrow text-white/70 ${"half" in f ? "col-span-1" : "col-span-2"}`}>
          {f.label}
          <input name={f.name} type={f.type} autoComplete={f.autoComplete} placeholder={f.label} className={input} />
        </label>
      ))}
      <label className="eyebrow col-span-2 text-white/70">
        Message
        <textarea name="message" rows={6} placeholder="Message" className={`${input} h-auto resize-none py-3`} />
      </label>
      {error && (
        <p role="alert" className="copy col-span-2 text-red-300">
          {error}
        </p>
      )}
      <div className="col-span-2 flex justify-center pt-4">
        <Button type="submit" variant="inverse">
          Send message
        </Button>
      </div>
    </form>
  );
}
