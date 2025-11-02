
import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Utensils,
  ShoppingBag,
  FileEdit,
  CircleUser,
} from "lucide-react";

export default function SimpleNav() {
  return (
    <header className="w-full border-b border-border bg-background">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3"
        aria-label="Global"
      >
        {/* Logo */}
        <Link
          to="/dashboard"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <img
            src="/images/logo.png"
            alt="Cloud Dine logo"
          
            className="h-15 w-23"
          />
          <span className="text-base">Cloud Dine</span>
        </Link>

        {/* Navigation Icons */}
        <ul className="flex items-center gap-4 md:gap-6">
          <li>
            <Link
              to="/owner"
              aria-label="Dashboard"
              className="rounded-md p-2 hover:bg-muted"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span className="sr-only">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/owner/menu"
              aria-label="Menu"
              className="rounded-md p-2 hover:bg-muted"
            >
              <Utensils className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Link>
          </li>
          <li>
            <Link
              to="/owner/orders"
              aria-label="Orders"
              className="rounded-md p-2 hover:bg-green"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Orders</span>
            </Link>
          </li>
          <li>
            <Link
              to="/owner/onboarding"
              aria-label="Edit Form"
              className="rounded-md p-2 hover:bg-muted"
            >
              <FileEdit className="h-5 w-5" />
              <span className="sr-only">Edit Form</span>
            </Link>
          </li>
          <li className="pl-1">
            <Link
              to="/profile"
              aria-label="Profile"
              className="rounded-md p-2 hover:bg-muted"
            >
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
