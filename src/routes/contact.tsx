import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Tilt } from "@/components/site/tilt";
import { CHARITIES, MANAGER, SITE } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [{ title: "Inquire — Richard Nuñez" }],
  }),
});

const SUBJECTS = [
  "Commission",
  "Live painting",
  "Charity auction",
  "Press",
  "Management",
  "Other",
] as const;

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");
  const [subject, setSubject] =
    useState<(typeof SUBJECTS)[number]>("Commission");

  return (
    <div>
      <section className="relative min-h-[72dvh] overflow-hidden">
        <img
          src="/images/inquire-hero.jpg"
          alt="Richard Nuñez"
          className="absolute inset-0 size-full object-cover object-[50%_35%]"
        />

        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/55 to-ink/15" />

        <div className="relative z-10 mx-auto flex min-h-[72dvh] max-w-6xl flex-col justify-end px-5 pb-14 pt-52 md:px-8">
          <p className="text-sm tracking-[0.3em] text-gilt uppercase">
            Richard Nuñez Art
          </p>

          <h1 className="mt-3 max-w-3xl font-display text-5xl md:text-6xl">
            Commissions, live work, auctions.
          </h1>

          <p className="mt-5 max-w-xl text-paper-dim">
            A commission, a live night, or a canvas for auction starts with a note.
          </p>

          <p className="mt-1 whitespace-nowrap text-sm text-paper-dim md:text-base">
            Artist Manager Michael Ulahannan takes it from here and brings it to Richard Nuñez.
          </p>
        </div>
      </section>

      <div className="overflow-hidden border-y border-line bg-ink-2 py-3">
        <div className="animate-marquee flex w-max gap-10 pr-10">
          {[...SUBJECTS, ...SUBJECTS, ...SUBJECTS].map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="font-display text-xl italic text-gilt/80"
            >
              {word}
              <span className="ml-10 text-ember">◆</span>
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto grid max-w-6xl items-start gap-12 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <Tilt>
            <img
              src={MANAGER.photo}
              alt={MANAGER.name}
              className="aspect-2/3 w-full border border-gilt/40 object-cover object-[50%_8%]"
            />
          </Tilt>
        </div>

        <div className="md:col-span-7">
          <p className="text-xs tracking-[0.3em] text-ember uppercase">
            The desk
          </p>

          <h2 className="mt-3 font-display text-4xl">
            Write the manager.
          </h2>

          <p className="mt-6 leading-relaxed text-paper-dim">
            {MANAGER.bio}
          </p>

          <dl className="mt-8 grid gap-4 border-y border-line py-6 sm:grid-cols-3">
            <div>
              <dt className="text-[10px] tracking-[0.2em] text-muted uppercase">
                Role
              </dt>

              <dd className="mt-1 font-display text-xl">
                {MANAGER.role}
              </dd>
            </div>

            <div>
              <dt className="text-[10px] tracking-[0.2em] text-muted uppercase">
                Age
              </dt>

              <dd className="mt-1 font-display text-xl">
                {MANAGER.age}
              </dd>
            </div>

            <div>
              <dt className="text-[10px] tracking-[0.2em] text-muted uppercase">
                Studio
              </dt>

              <dd className="mt-1 font-display text-xl">
                Dallas
              </dd>
            </div>
          </dl>

          <a
            href={`mailto:${SITE.email}?subject=${encodeURIComponent(
              "Management — " + MANAGER.name,
            )}`}
            className="mt-8 inline-flex min-h-11 items-center bg-gilt px-6 text-xs tracking-[0.2em] text-ink uppercase transition-transform duration-150 ease-out active:scale-[0.96]"
          >
            Email the studio
          </a>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-24 md:grid-cols-2 md:px-8">
        <div>
          <p className="text-xs tracking-[0.3em] text-gilt uppercase">
            {MANAGER.role}
          </p>

          <h2 className="mt-3 font-display text-2xl">
            {MANAGER.name}
          </h2>

          <p className="mt-3 text-sm text-paper-dim">
            {MANAGER.age} years old. Richard Nuñez studio.
          </p>

          <h3 className="mt-12 font-display text-2xl text-gilt">
            Past Charity Events Held
          </h3>

          <ul className="mt-4 columns-1 gap-6 text-sm text-muted sm:columns-2">
            {CHARITIES.map((c) => (
              <li key={c} className="mb-2">
                {c}
              </li>
            ))}
          </ul>
        </div>

        <form
          className="h-fit border border-line bg-ink-2 p-6 md:p-8"
          onSubmit={async (e) => {
            e.preventDefault();

            setSending(true);
            setSent(false);
            setFormError("");

            const form = e.currentTarget;
            const data = new FormData(form);

            const accessKey =
              import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

            if (!accessKey) {
              setSending(false);
              setFormError(
                "Form configuration error. Please try again later.",
              );

              console.error(
                "VITE_WEB3FORMS_ACCESS_KEY is missing.",
              );

              return;
            }

            data.append("access_key", accessKey);
            data.append("subject", subject);
            data.append(
              "from_name",
              "Richard Nuñez Art Website",
            );

            try {
              const object = Object.fromEntries(data);
              const json = JSON.stringify(object);

              const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                  body: json,
                },
              );

              const result = await response.json();

              console.log("Web3Forms response:", result);

              if (result.success) {
                setSent(true);
                setFormError("");
                form.reset();

                const win = window as Window & {
                  gtag?: (...args: unknown[]) => void;
                };

                if (typeof win.gtag === "function") {
                  win.gtag("event", "generate_lead", {
                    event_category: "contact",
                    event_label: subject,
                  });
                }
              } else {
                setSent(false);

                setFormError(
                  result.message ||
                    "Something went wrong. Please try again.",
                );

                console.error(
                  "Web3Forms error:",
                  result,
                );
              }
            } catch (error) {
              setSent(false);

              setFormError(
                "Something went wrong. Please try again.",
              );

              console.error(
                "Web3Forms error:",
                error,
              );
            } finally {
              setSending(false);
            }
          }}
        >
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <label className="block text-xs tracking-[0.16em] uppercase">
            Name

            <input
              required
              name="name"
              className="mt-2 h-12 w-full border border-line bg-ink px-3 text-paper outline-none focus:border-gilt"
            />
          </label>

          <label className="mt-5 block text-xs tracking-[0.16em] uppercase">
            Email

            <input
              required
              type="email"
              name="email"
              className="mt-2 h-12 w-full border border-line bg-ink px-3 text-paper outline-none focus:border-gilt"
            />
          </label>

          <p className="mt-5 text-xs tracking-[0.16em] uppercase">
            Subject
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {SUBJECTS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSubject(s)}
                className={cn(
                  "min-h-10 px-3 text-[11px] tracking-[0.14em] uppercase transition-colors",
                  subject === s
                    ? "bg-gilt text-ink"
                    : "border border-line text-paper-dim hover:border-gilt",
                )}
              >
                {s}
              </button>
            ))}
          </div>

          <label className="mt-5 block text-xs tracking-[0.16em] uppercase">
            Message

            <textarea
              required
              name="message"
              rows={6}
              className="mt-2 w-full border border-line bg-ink p-3 text-paper outline-none focus:border-gilt"
            />
          </label>

          <button
            type="submit"
            disabled={sending}
            className="mt-6 min-h-12 w-full bg-ember text-sm tracking-[0.2em] text-paper uppercase transition-transform duration-150 ease-out active:scale-[0.96]"
          >
            {sending
              ? "Sending..."
              : sent
                ? "Inquiry sent"
                : "Send inquiry"}
          </button>

          {sent && (
            <p className="mt-4 text-center text-sm text-gilt">
              Your inquiry has been sent successfully.
            </p>
          )}

          {formError && (
            <p className="mt-4 text-center text-sm text-ember">
              {formError}
            </p>
          )}
        </form>
      </section>
    </div>
  );
}