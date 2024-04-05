import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Dog,
  Home,
  LineChart,
  Package,
  PawPrint,
  Settings,
  ShoppingCart,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { MobileNavItems, SideNavItems } from "./nav-items";

type SideNavigationProps = {
  role: string | null | undefined;
};

export function SideNavigation({ role }: SideNavigationProps) {
  if (typeof role !== "string") {
    return (
      <p className="grid items-start px-2 text-sm font-medium lg:px-4">
        No Role Assigned
      </p>
    );
  }

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <SideNavItems role={role} />
    </nav>
  );
}

export function MobileNavigation({ role }: SideNavigationProps) {
  if (typeof role !== "string") {
    return;
  }

  return (
    <nav className="grid gap-2 text-lg font-medium">
      <MobileNavItems role={role} />
    </nav>
  );
}
