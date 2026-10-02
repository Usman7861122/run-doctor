import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Errors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

/**
 * Contact form with inline validation.
 * NOTE: there is no backend yet. Hook `onSubmit` up to a form service
 * (Formspree, Netlify Forms, your own API) before going live.
 * Do not collect detailed medical info over a plain form (HIPAA).
 */
export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function validate(data: FormData): Errors {
    const e: Errors = {};
    if (!String(data.get("name") ?? "").trim())
      e.name = "Please enter your name.";
    const email = String(data.get("email") ?? "").trim();
    if (!/^\S+@\S+\.\S+$/.test(email))
      e.email = "Please enter a valid email, like name@example.com.";
    const phone = String(data.get("phone") ?? "").replace(/\D/g, "");
    if (phone && phone.length < 10)
      e.phone = "Phone number looks too short. Include your area code.";
    if (String(data.get("message") ?? "").trim().length < 10)
      e.message = "Please add a short message (at least 10 characters).";
    return e;
  }

  async function onSubmit(ev: {
    preventDefault(): void;
    currentTarget: HTMLFormElement;
  }) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const e = validate(new FormData(form));
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 900)); // TODO: replace with real submit
    setStatus("sent");
    form.reset();
  }

  const field =
    "mt-2 block w-full rounded-xl border bg-white px-4 py-3.5 text-base text-ink placeholder:text-muted/60 transition focus:border-navy-700 focus:ring-4 focus:ring-navy-100 focus:outline-none";
  const cls = (k: keyof Errors) =>
    `${field} ${errors[k] ? "border-red-600" : "border-navy-900/15"}`;
  const Err = ({ k }: { k: keyof Errors }) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-2 text-sm text-red-700">
        {errors[k]}
      </p>
    ) : null;

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-navy-50 rounded-2xl p-10 text-center"
            role="status"
          >
            <div className="bg-ember-500 text-navy-950 mx-auto grid size-14 place-items-center rounded-full">
              <svg
                viewBox="0 0 24 24"
                className="size-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h3 className="mt-6 text-3xl">Thank you!</h3>
            <p className="text-muted mt-3">
              We got your message and will call you back within one business
              day.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="btn-outline mt-8"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            className="grid gap-5 sm:grid-cols-2"
            exit={{ opacity: 0 }}
          >
            <div>
              <label
                htmlFor="name"
                className="text-navy-900 text-sm font-medium"
              >
                Full name <span className="text-ember-600">*</span>
              </label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                className={cls("name")}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              <Err k="name" />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="text-navy-900 text-sm font-medium"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                className={cls("phone")}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              <Err k="phone" />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="text-navy-900 text-sm font-medium"
              >
                Email <span className="text-ember-600">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={cls("email")}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              <Err k="email" />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="provider"
                className="text-navy-900 text-sm font-medium"
              >
                Preferred provider
              </label>
              <select
                id="provider"
                name="provider"
                className={`${field} border-navy-900/15`}
              >
                <option>No preference</option>
                <option>Dr. Lawrence Maurer</option>
                <option>Dr. Kate Cryderman</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="text-navy-900 text-sm font-medium"
              >
                How can we help? <span className="text-ember-600">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className={cls("message")}
                aria-invalid={!!errors.message}
                aria-describedby={
                  errors.message ? "message-error" : "message-hint"
                }
              />
              {errors.message ? (
                <Err k="message" />
              ) : (
                <p id="message-hint" className="text-muted mt-2 text-sm">
                  Please don't include private medical details. We'll discuss
                  those by phone.
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto"
              >
                {status === "sending" ? (
                  <>
                    <span
                      className="border-navy-950/30 border-t-navy-950 size-4 animate-spin rounded-full border-2"
                      aria-hidden="true"
                    />
                    Sending...
                  </>
                ) : (
                  "Request Appointment"
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
