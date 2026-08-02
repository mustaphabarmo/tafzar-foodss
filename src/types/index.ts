export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface SpinPrize {
  id: string;
  label: string;
  weight: number;
  description?: string;
  isLoss?: boolean;
  color?: string;
  emoji?: string;
}

export interface SocialLink {
  platform: "instagram" | "facebook" | "tiktok" | "whatsapp" | "twitter";
  url: string;
  label: string;
  handle?: string;
}

export interface CompanyDetails {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  whatsapp: string;
  whatsappMessage: string;
  address: string;
  businessHours: BusinessHours[];
  founded: string;
  mission: string;
  vision: string;
  values: CompanyValue[];
}

export interface BusinessHours {
  days: string;
  hours: string;
}

export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}
