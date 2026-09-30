const money = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 2 });

export const formatPrice = (value: number) => money.format(value);

const longDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

export const formatDate = (iso: string) => longDate.format(new Date(iso));

export const pad2 = (n: number) => String(n).padStart(2, "0");
