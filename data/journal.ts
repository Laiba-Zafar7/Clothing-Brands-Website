export interface Article {
  slug: string;
  title: string;
  category: string;
  minutes: number;
  date: string; // ISO
  image: string;
  alt: string;
  excerpt: string;
  body: { heading?: string; text: string }[];
}

export const articles: Article[] = [
  {
    slug: "a-palette-for-the-cold-months",
    title: "A palette for the cold months",
    category: "Design",
    minutes: 5,
    date: "2026-09-18",
    image: "/images/editorial/field.jpg",
    alt: "Two models in black and white tailoring standing in a windswept field",
    excerpt: "Four tones carry every autumn run: ink, bone, moss and a brown we keep calling tobacco.",
    body: [
      { text: "Every season begins the same way: a table, a window and a pile of swatches that is far too large. By the end of the week there are four left. This autumn they are ink, bone, moss and a deep brown we have been calling tobacco for so long that nobody remembers its real name." },
      { heading: "Why four", text: "A small palette is not a restriction, it is a promise. It means the coat you buy this year will sit with the trouser you bought two years ago, and with the knit you have not bought yet. It is the quiet logic behind a wardrobe that works." },
      { heading: "Light, not colour", text: "We judge colour outdoors, in flat northern light, and again under a single warm bulb. If a shade only works in one of them, it does not make the cut. Ink should read as ink at noon and at midnight." },
      { text: "The result is a collection that photographs quietly and wears loudly — in the sense that people notice, without quite knowing why." },
    ],
  },
  {
    slug: "repair-not-replace",
    title: "Repair, not replace",
    category: "Sustainability",
    minutes: 7,
    date: "2026-08-27",
    image: "/images/editorial/linen.jpg",
    alt: "A linen top hanging from a branch against a pale wall",
    excerpt: "Our workroom mends anything we have ever made. Here is what comes back, and what we learn from it.",
    body: [
      { text: "Last year, three hundred and twelve garments came back to the workroom. Not returns — repairs. Frayed cuffs, split seams, a coat that had been caught in a car door in Milan. Every one of them went home again." },
      { heading: "What breaks", text: "Pockets, mostly. Then elbows, then hems. We keep a ledger, and the ledger changes how we cut. Pocket bags are now doubled. Hems are deeper, so they can be let down." },
      { heading: "The free part", text: "Repairs on anything we made are free for the life of the garment. You pay the postage one way; we pay it back. It is the most expensive thing we do and the most worthwhile." },
    ],
  },
  {
    slug: "inside-the-studio",
    title: "Inside the studio",
    category: "Atelier",
    minutes: 4,
    date: "2026-08-09",
    image: "/images/editorial/studio.jpg",
    alt: "A warm, softly lit clothing studio with rails and a paper lantern",
    excerpt: "Ten people, two cutting tables and a paper lantern that has survived three moves.",
    body: [
      { text: "The studio is smaller than people imagine. Two cutting tables, one long rail, a steam press older than most of the team, and a paper lantern that has survived three moves and one small fire." },
      { heading: "Small on purpose", text: "We make in runs of forty to two hundred. It means we sell out, sometimes quickly. It also means every garment is checked by a person who knows who cut it." },
      { text: "Visitors are welcome on the first Saturday of every month. Write to us and we will put the kettle on." },
    ],
  },
  {
    slug: "the-case-for-fewer-things",
    title: "The case for fewer things",
    category: "Essay",
    minutes: 6,
    date: "2026-07-22",
    image: "/images/editorial/folded.jpg",
    alt: "Folded black and white knitwear stacked on a white chair",
    excerpt: "A wardrobe of forty pieces, worn well, beats a wardrobe of four hundred worn once.",
    body: [
      { text: "The most sustainable garment is the one already in your wardrobe. The second most sustainable is the one you will still be wearing in ten years. Everything we make is aimed squarely at the second." },
      { heading: "Cost per wear", text: "It is an unromantic sum, but a useful one. A coat worn two hundred times is cheaper than a coat worn twice, whatever the price tag says." },
      { text: "So buy less. Buy better. And when something wears thin, send it back to us." },
    ],
  },
  {
    slug: "how-to-read-a-seam",
    title: "How to read a seam",
    category: "Craft",
    minutes: 5,
    date: "2026-06-30",
    image: "/images/editorial/rack.jpg",
    alt: "White jackets hanging on wooden hangers against a dark background",
    excerpt: "Turn a garment inside out and it will tell you almost everything about how long it will last.",
    body: [
      { text: "Before you look at the label, turn the garment inside out. The inside of a jacket is where a maker either tells the truth or hopes you will not look." },
      { heading: "Allowances", text: "Generous seam allowances mean the garment can be let out. Narrow, overlocked edges mean it cannot. We leave at least two centimetres on every structural seam." },
      { heading: "Stitch count", text: "More stitches per centimetre means a stronger, flatter seam. On shirting we sew at seven per centimetre. Most fast fashion sits at three or four." },
    ],
  },
  {
    slug: "a-season-in-the-woods",
    title: "A season in the woods",
    category: "Campaign",
    minutes: 3,
    date: "2026-06-04",
    image: "/images/editorial/forest.jpg",
    alt: "A model in a dark blazer and striped top walking through an autumn forest",
    excerpt: "Behind the autumn campaign: one forest, one week, and a lot of fallen leaves.",
    body: [
      { text: "We shot the autumn campaign in a beech forest an hour outside the city, over one week in late October. No sets, no lights, no retouching of the clothes." },
      { heading: "Why outside", text: "Clothes made for cold weather should be photographed in it. You see how wool holds its shape in the wind, and how a trouser moves over uneven ground." },
    ],
  },
];
