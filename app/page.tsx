import { Hero } from "@/components/hero/Hero";
import { Ethos } from "@/components/sections/Ethos";
import { EditSplit } from "@/components/sections/EditSplit";
import { LatestTrends } from "@/components/sections/LatestTrends";
import { Testimonials } from "@/components/sections/Testimonials";
import { Capsule } from "@/components/sections/Capsule";
import { Newsletter } from "@/components/sections/Newsletter";
import { pick } from "@/lib/products";
import { site } from "@/data/site";

const womensEdit = pick([
  "emerald-wrap-dress",
  "gold-tank-watch",
  "belted-crepe-jumpsuit",
  "mira-leather-tote",
  "terracotta-wrap-maxi",
  "tipped-knit-polo-set",
]);

const mensEdit = pick([
  "white-poplin-shirt",
  "field-chronograph",
  "navy-half-zip-polo",
  "olive-linen-shirt",
  "integrated-steel-watch",
  "cream-tipped-knit-polo",
]);

const latest = pick([
  "cognac-saddle-bag",
  "steel-date-watch",
  "ivory-a-line-midi",
  "emerald-dial-watch",
  "ringer-cotton-tee",
  "two-tone-boston",
  "cornflower-satin-wrap",
  "beaded-bracelet-watch",
]);

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ethos />
      <EditSplit
        id="womens-edit"
        title="Women’s Edit"
        caption="Tailoring, knitwear and dresses cut for long days and longer evenings."
        eyebrow="Just Landed"
        season={`Women’s ${site.season}`}
        video={{ src: "/videos/women-edit.mp4", poster: "/images/editorial/women-edit-poster.jpg", className: "object-[40%_50%]" }}
        products={womensEdit}
        href="/women"
      />
      <EditSplit
        id="mens-edit"
        title="Men’s Edit"
        caption="Shirting, knitwear and watches built for the everyday."
        eyebrow="New This Season"
        season={`Men’s ${site.season}`}
        video={{ src: "/videos/men-edit.mp4", poster: "/images/editorial/men-edit-poster.jpg", className: "object-[55%_50%]" }}
        products={mensEdit}
        href="/men"
        videoSide="right"
      />
      <LatestTrends products={latest} />
      <Testimonials />
      <Capsule />
      <Newsletter />
    </>
  );
}
