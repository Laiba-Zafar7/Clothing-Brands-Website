import { site } from "./site";

export interface LegalSection {
  heading: string;
  text: string[];
}

export const legalUpdated = "1 September 2026";

export const privacy: LegalSection[] = [
  { heading: "What we collect", text: ["When you order or write to us we collect your name, email, delivery address and order details. We never see or store full card numbers — payments are handled by our payment provider."] },
  { heading: "How we use it", text: ["To fulfil and deliver your order, answer your messages and, only if you ask, send our newsletter. We do not sell or rent your data to anyone."] },
  { heading: "Cookies", text: ["We use essential storage to remember your bag and saved pieces on this device. We do not use advertising trackers."] },
  { heading: "Your rights", text: [`You can ask to see, correct or delete the information we hold at any time by writing to ${site.email}. We will respond within 30 days.`] },
];

export const terms: LegalSection[] = [
  { heading: "About us", text: [`${site.name} is a studio based in London. These terms apply to every order placed on this site.`] },
  { heading: "Orders", text: ["Placing an order is an offer to buy. A contract is formed when we email to confirm dispatch. Because we make in small runs, occasionally a piece sells out before we can confirm; if so we refund you in full, immediately."] },
  { heading: "Prices", text: ["Prices are shown in pounds sterling and include UK VAT. International duties are calculated at checkout."] },
  { heading: "Returns", text: ["Unworn pieces in their original condition may be returned within 30 days of delivery for a refund to the original payment method."] },
  { heading: "Repairs", text: ["We repair anything we have made, free of charge, for the life of the garment. Repairs do not affect your statutory rights."] },
];

export const shipping: LegalSection[] = [
  { heading: "Dispatch", text: ["Every order leaves our London studio within one working day, wrapped in recycled tissue and a reusable cotton bag."] },
  { heading: "Delivery times", text: ["United Kingdom: 1–2 working days.", "Europe: 2–4 working days.", "Rest of the world: 3–6 working days."] },
  { heading: "Costs", text: ["Complimentary delivery on orders over £250. Otherwise £6 in the UK, £15 to Europe and £25 worldwide. Duties and taxes are calculated at checkout — nothing to pay on arrival."] },
  { heading: "Returns", text: ["Returns are free from the UK and EU. Request a label by writing to us with your order number."] },
];
