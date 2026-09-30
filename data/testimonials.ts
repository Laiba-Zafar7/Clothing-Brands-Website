export interface Testimonial {
  quote: string;
  name: string;
  city: string;
  rating: number;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  { quote: "The shirt arrived folded in tissue like a letter. Two years later it is still the first thing I reach for.", name: "Julian M.", city: "London", rating: 5, avatar: "/images/avatars/avatar-1.jpg" },
  { quote: "I bought the polo meaning to wear it once for a wedding. I have worn it every other weekend since.", name: "Clara B.", city: "Stockholm", rating: 5, avatar: "/images/avatars/avatar-2.jpg" },
  { quote: "Linen that actually gets better. The colour has softened into something I could not have chosen on purpose.", name: "Daniel O.", city: "Lagos", rating: 5, avatar: "/images/avatars/avatar-3.jpg" },
  { quote: "The jumpsuit fits like it was cut for me. Sizing runs a touch generous — go down if in doubt.", name: "Sofia R.", city: "Milan", rating: 4, avatar: "/images/avatars/avatar-4.jpg" },
  { quote: "They repaired a knit I had worn through at the elbow, for free, and sent it back better than new.", name: "Marco L.", city: "Lisbon", rating: 5, avatar: "/images/avatars/avatar-5.jpg" },
  { quote: "Nothing about it shouts. People just ask where it is from, every single time.", name: "Henrik S.", city: "Copenhagen", rating: 5, avatar: "/images/avatars/avatar-6.jpg" },
];
