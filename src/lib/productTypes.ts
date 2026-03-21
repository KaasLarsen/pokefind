export type ProductRecord = {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string | null;
  merchant: string;
  affiliateUrl: string;
  feedSource: string;
  lastSeen: string;
};
