import {
  IconArrowRight,
  IconArrowUpRight,
  IconBarbell,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconBuildingStore,
  IconCalendarCheck,
  IconClock,
  IconDiscountCheck,
  IconExternalLink,
  IconFlame,
  IconHeartbeat,
  IconMapPin,
  IconPhone,
  IconUserCheck,
  IconUsersGroup,
} from "@tabler/icons-react";
import type { IconName } from "@/types/site";

const icons = {
  barbell: IconBarbell,
  clock: IconClock,
  whatsapp: IconBrandWhatsapp,
  instagram: IconBrandInstagram,
  "map-pin": IconMapPin,
  phone: IconPhone,
  "user-check": IconUserCheck,
  "users-group": IconUsersGroup,
  "calendar-check": IconCalendarCheck,
  "discount-check": IconDiscountCheck,
  building: IconBuildingStore,
  "arrow-right": IconArrowRight,
  "arrow-up-right": IconArrowUpRight,
  "external-link": IconExternalLink,
  heart: IconHeartbeat,
  flame: IconFlame,
} as const;

interface AppIconProps {
  name: IconName;
  size?: number;
  stroke?: number;
  className?: string;
}

/** Ícones Tabler decorativos (aria-hidden). O significado deve estar no texto ao lado. */
export function AppIcon({ name, size = 24, stroke = 1.75, className }: AppIconProps) {
  const Icon = icons[name];
  return <Icon size={size} stroke={stroke} className={className} aria-hidden="true" />;
}
