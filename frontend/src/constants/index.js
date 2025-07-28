import { LayoutDashboard, List, Image, Mail } from "lucide-react";
import {
  blueballon,
  greenballon,
  orangeballon,
  purpleballon,
  redballon,
} from "../assets";

export const adminMenuItems = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Categories",
    path: "/admin/categories",
    icon: List,
  },
  {
    title: "Decorations",
    path: "/admin/decorations",
    icon: Image,
  },
  {
    title: "Messages",
    path: "/admin/messages",
    icon: Mail,
  },
];

export const navLinks = [
  { name: "Home", to: "/" },
  { name: "Catalog", to: "/catalog" },
  { name: "Contact", to: "/contact" },
];

export const images = [
  blueballon,
  greenballon,
  orangeballon,
  redballon,
  purpleballon,
  blueballon,
  greenballon,
  orangeballon,
  redballon,
  purpleballon,
];
