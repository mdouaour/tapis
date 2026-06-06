import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["ar", "fr"],
  defaultLocale: "ar",
  localeDetection: true,
  localePrefix: "always",
});

export const { Link, useRouter, usePathname, redirect, permanentRedirect } =
  createNavigation(routing);
