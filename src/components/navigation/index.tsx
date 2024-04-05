import Link from "next/link";
import { Home, ShoppingCart, Package, Users, LineChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { navItems } from "./data";

type SideNavigationProps = {
  role: string;
}

export default function SideNavigation() {
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navItems.map((nav) => (
        <Link
          key={nav.label}
          href={nav.href}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <nav.icon className="h-4 w-4" />
          {nav.label}
        </Link>
      ))}
    </nav>
  );
}
