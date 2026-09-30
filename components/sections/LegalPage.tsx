import type { LegalSection } from "@/data/legal";
import { pad2 } from "@/lib/format";
import { PageIntro } from "./PageIntro";

export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: LegalSection[] }) {
  return (
    <>
      <PageIntro eyebrow={`Last updated ${updated}`} title={title} />
      <div data-header="light" className="bg-background px-gutter pb-section">
        <div className="mx-auto max-w-[680px] border-t border-border">
          {sections.map((s, i) => (
            <section key={s.heading} className="grid gap-4 border-b border-border py-10 sm:grid-cols-[4rem_1fr]">
              <span className="eyebrow text-muted">{pad2(i + 1)}</span>
              <div>
                <h2 className="display-sm">{s.heading}</h2>
                {s.text.map((t) => (
                  <p key={t} className="mt-4 text-[15px] leading-[1.75] text-foreground/80">
                    {t}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
