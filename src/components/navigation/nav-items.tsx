"use client";

import { cn } from "@/lib/utils";
import {
  Calendar,
  ClipboardPenLine,
  Dog,
  Home,
  LucideIcon,
  PawPrint,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  isSelected: boolean;
};

type NavItemsProps = {
  role: string;
};

export function SideNavItems({ role }: NavItemsProps) {
  const pathName = usePathname();
  const navItemsAdmin: NavItem[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: Home,
      isSelected: pathName === "/dashboard",
    },
    {
      label: "Bookings",
      href: "/dashboard/bookings",
      icon: Calendar,
      isSelected: pathName.startsWith("/dashboard/bookings"),
    },
    {
      label: "Customers",
      href: "/dashboard/customers",
      icon: Users,
      isSelected: pathName === "/dashboard/customers",
    },
    {
      label: "Dogs",
      href: "/dashboard/dogs",
      icon: Dog,
      isSelected: pathName.startsWith("/dashboard/dogs"),
    },
    {
      label: "Services",
      href: "/dashboard/services",
      icon: ClipboardPenLine,
      isSelected: pathName.startsWith("/dashboard/services"),
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      isSelected: pathName === "/dashboard/settings",
    },
  ];
  const navItemsMember: NavItem[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: Home,
      isSelected: pathName === "/dashboard",
    },
    {
      label: "Bookings",
      href: "/dashboard/bookings",
      icon: Calendar,
      isSelected: pathName.startsWith("/dashboard/bookings"),
    },
    {
      label: "Dogs",
      href: "/dashboard/dogs",
      icon: Dog,
      isSelected: pathName.startsWith("/dashboard/dogs"),
    },
  ];
  let navItems: NavItem[];
  switch (role) {
    case "org:admin":
      navItems = navItemsAdmin;
      break;
    case "org:member":
      navItems = navItemsMember;
      break;
    default:
      navItems = [];
  }
  return (
    <>
      {navItems.map((nav) => (
        <Link
          key={nav.label}
          href={nav.href}
          className={cn([
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            nav.isSelected && "bg-accent text-accent-foreground",
          ])}
        >
          <nav.icon className="h-4 w-4" />
          {nav.label}
        </Link>
      ))}
    </>
  );
}

export function MobileNavItems({ role }: NavItemsProps) {
  const pathName = usePathname();
  const navItemsAdmin: NavItem[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: Home,
      isSelected: pathName === "/dashboard",
    },
    {
      label: "Bookings",
      href: "/dashboard/bookings",
      icon: Calendar,
      isSelected: pathName === "/dashboard/bookings",
    },
    {
      label: "Customers",
      href: "/dashboard/customers",
      icon: Users,
      isSelected: pathName === "/dashboard/customers",
    },
    {
      label: "Dogs",
      href: "/dashboard/dogs",
      icon: Dog,
      isSelected: pathName === "/dashboard/dogs",
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      isSelected: pathName === "/dashboard/settings",
    },
  ];
  const navItemsMember: NavItem[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: Home,
      isSelected: pathName === "/dashboard",
    },
    {
      label: "Bookings",
      href: "/dashboard/bookings",
      icon: Calendar,
      isSelected: pathName === "/dashboard/bookings",
    },
    {
      label: "Dogs",
      href: "/dashboard/dogs",
      icon: Dog,
      isSelected: pathName === "/dashboard/dogs",
    },
  ];
  let navItems: NavItem[];
  switch (role) {
    case "org:admin":
      navItems = navItemsAdmin;
      break;
    case "org:member":
      navItems = navItemsMember;
      break;
    default:
      navItems = [];
  }
  return (
    <>
      <Link
        href="/dashboard"
        className="flex items-center gap-2 text-lg font-semibold"
      >
        <PawPrint className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      {navItems.map((nav) => {
        <Link
          key={nav.label}
          href={nav.href}
          className={cn([
            "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
            nav.isSelected && "bg-accent text-accent-foreground",
          ])}
        >
          <nav.icon className="h-5 w-5" />
          {nav.label}
        </Link>;
      })}
    </>
  );
}
