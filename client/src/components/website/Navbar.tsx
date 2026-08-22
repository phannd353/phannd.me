"use client";

import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Menu, User, LogOut, LayoutDashboard } from "lucide-react";
import { UserAvatar } from "@/components/auth/user/user-avatar";

import NavLink from "./NavLink";
import { ModeToggle } from "../mode-toggle";
import { Button, buttonVariants } from "../ui/button";
import { authClient, isAdmin, isEditor } from "@/lib/auth-client";
import LanguageSwitcher from "../language-switcher";
import { getHeaderNavItems } from "@/content/menus/header-nav-items";
import { useTheme } from "next-themes";
import { useSignOut } from "@better-auth-ui/react";

interface NavbarProps {
  appTitle: string;
  appLogo: string;
  appLogoDark: string;
  navItems: Awaited<ReturnType<typeof getHeaderNavItems>>;
}

export const Navbar = ({
  appTitle = "PhanND",
  appLogo,
  appLogoDark,
  navItems,
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { resolvedTheme: theme } = useTheme();
  const { mutate: signOut } = useSignOut(authClient);
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const t = useTranslations("HomePage");

  const handleSignOut = async () => {
    signOut();
    router.refresh();
  };

  const logoToUse = theme === "dark" ? appLogoDark : appLogo;

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background overflow-hidden">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="h-14 w-screen">
          <div className="container flex justify-start items-center px-4">
            <NavigationMenuItem className="font-bold flex">
              <Link
                rel="noreferrer noopener"
                href="/"
                className="ml-2 font-bold text-xl flex items-center py-1"
              >
                <Image
                  src={logoToUse}
                  alt={appTitle}
                  width={100}
                  height={50}
                  className="logo-img mr-2 object-contain"
                />
              </Link>
            </NavigationMenuItem>

            {/* mobile */}
            <NavigationMenuItem className="flex md:hidden ml-auto">
              <ModeToggle />

              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger className="px-2" aria-label="Open menu">
                  <Menu
                    className="flex md:hidden h-5 w-5"
                    onClick={() => setIsOpen(true)}
                  >
                    <span className="sr-only">Menu Icon</span>
                  </Menu>
                </SheetTrigger>

                <SheetContent side={"left"}>
                  <SheetHeader>
                    <SheetTitle className="font-bold text-xl flex items-center">
                      <Image
                        src={logoToUse}
                        alt={appTitle}
                        width={100}
                        height={100}
                        priority
                        fetchPriority="high"
                        className="m-auto object-contain"
                      />
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col justify-center items-center gap-2">
                    {navItems
                      .sort((a, b) => a.order - b.order)
                      .map((item, i) => (
                        <NavLink
                          key={i}
                          onClick={() => setIsOpen(false)}
                          className={buttonVariants({ variant: "outline" })}
                          navItem={item}
                        />
                      ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </NavigationMenuItem>

            {/* desktop */}
            <NavigationMenuItem className="hidden md:block ml-10 grow">
              <nav className="flex gap-2">
                {navItems
                  .sort((a, b) => a.order - b.order)
                  .map((item, i) => (
                    <NavLink
                      key={i}
                      className={`text-[17px] ${buttonVariants({
                        variant: "outline",
                      })}`}
                      navItem={item}
                    />
                  ))}
              </nav>
            </NavigationMenuItem>

            <NavigationMenuItem className="hidden md:flex gap-2">
              {/*{!session && (
                <>
                  <Button>
                    <Link href="/auth/sign-up">{t("Auth.sign-up")}</Link>
                  </Button>

                  <Button variant={"outline"}>
                    <Link href="/auth/sign-in">{t("Auth.sign-in")}</Link>
                  </Button>
                </>
              )}*/}

              {/* <LanguageSwitcher /> */}

              <ModeToggle />
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
