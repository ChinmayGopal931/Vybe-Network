import { Icons } from "@/components/icons";

interface NavItem {
  title: string;
  to?: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
}

interface NavItemWithChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export const mainMenu: NavItemWithChildren[] = [
  {
    title: "Analytics",
    to: "/",
  },
  {
    title: "Analytics with Shadcn",
    to: "/analytics",
  },
];

export const sideMenu: NavItemWithChildren[] = [
  {
    title: "Dashboard",
    to: "/",
  },
  {
    title: "Empty Page",
    to: "/empty",
  },
  {
    title: "Error Page",
    to: "/error",
  },
];
