import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section data-header="light" className="grid min-h-svh bg-background lg:grid-cols-2">
      <div className="flex flex-col items-start justify-center px-inset pb-16 pt-[calc(var(--header-h)+8svh)]">
        <p className="eyebrow text-muted">Error 404</p>
        <h1 className="display-xl mt-6 max-w-[10ch]">This page has left the rail.</h1>
        <p className="copy mt-8 max-w-[42ch]">
          The piece or page you were looking for has moved, sold out, or never existed. The rest of the collection is
          still here.
        </p>
        <div className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href="/shop">Shop all</ButtonLink>
          <ButtonLink href="/" variant="outline">
            Back home
          </ButtonLink>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <Image src="/images/editorial/linen.jpg" alt="An empty linen top hanging from a branch" fill priority sizes="50vw" className="object-cover" />
      </div>
    </section>
  );
}
