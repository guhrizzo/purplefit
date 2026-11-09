export type IconName =
  | "barbell"
  | "clock"
  | "whatsapp"
  | "instagram"
  | "map-pin"
  | "phone"
  | "user-check"
  | "users-group"
  | "calendar-check"
  | "discount-check"
  | "building"
  | "arrow-right"
  | "arrow-up-right"
  | "external-link"
  | "heart"
  | "flame";

export interface NavItem {
  label: string;
  href: string;
  /** id da seção (sem #), usado para destacar o item ativo */
  id: string;
}

export interface OpeningHours {
  label: string;
  /** Texto exibido, ex.: "05h às 23h" */
  display: string;
  /** Dias no padrão schema.org */
  days: string[];
  opens: string;
  closes: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export interface Modality {
  slug: string;
  name: string;
  description: string;
  image: string;
  alt: string;
  icon: IconName;
}

export interface Differential {
  title: string;
  description: string;
  icon: IconName;
}
