import { Home, ShoppingCart, Package, Users, Dog, Settings, Calendar, type LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: Home
  },
  {
    label: 'Bookings',
    href: '/bookings',
    icon: Calendar
  },
  {
    label: 'Customers',
    href: '/customers',
    icon: Users
  },
  {
    label: 'Dogs',
    href: '/dogs',
    icon: Dog
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings
  },
]