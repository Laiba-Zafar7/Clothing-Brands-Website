import Link from "next/link";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { footerShop, legalNav, mainNav, site } from "@/data/site";

const company = mainNav.filter((l) => l.href !== "/");

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="eyebrow mb-5 text-white/45">{title}</h2>
      <ul className="meta space-y-3.5">{children}</ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer data-header="dark" className="relative z-10 overflow-hidden bg-black text-white">
      <div className="px-inset pt-20 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-lg font-semibold">{site.name}</p>
            <p className="copy mt-4 max-w-[34ch] text-white/55">{site.tagline}</p>
            <p className="copy mt-5 text-white/55">{site.cities}</p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <Column title="Shop">
              {footerShop.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-line">
                    {l.label}
                  </Link>
                </li>
              ))}
            </Column>
            <Column title="Company">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-line">
                    {l.label}
                  </Link>
                </li>
              ))}
            </Column>
            <Column title="Get in touch">
              <li>
                <a href={`mailto:${site.email}`} className="link-line break-all">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.instagram} target="_blank" rel="noreferrer" className="link-line">
                  Instagram
                </a>
              </li>
            </Column>
          </div>
        </div>

        <div className="mx-auto mt-20 w-full max-w-xs sm:max-w-sm lg:mt-28">
          <div className="relative aspect-video overflow-hidden rounded-t-full">
            <BackgroundVideo
              src="/videos/footer.mp4"
              poster="/images/editorial/footer-poster.jpg"
              sizes="(min-width: 640px) 24rem, 20rem"
            />
          </div>
        </div>

        <p
          aria-hidden="true"
          className="mt-16 select-none whitespace-nowrap text-center text-[23.5vw] font-semibold leading-[0.8] tracking-[-0.045em] lg:mt-20 lg:text-[21.5vw]"
        >
          {site.wordmark}
        </p>

        <div className="mt-10 flex flex-col gap-4 border-t border-border-dark py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow text-white/45">
            © {year} {site.wordmark}
          </p>
          <ul className="eyebrow flex gap-7 text-white/45">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-line transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
