"use client";

import { useState } from "react";
import { Navdata } from "@/data/nav.data";
import Link from "next/link";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "@/context/theme/theme-toggle";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  // const session =false

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-full">
        <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 h-16 bg-slate-300 dark:bg-black bg-opacity-50 dark:bg-opacity-60 backdrop-blur-sm">
          <Link
            className="text-xl font-mono md:text-2xl font-bold hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors duration-300"
            href="/"
          >
            OptiCare
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {Navdata.map((item) => (
              <Link
                key={item.id}
                className="text-sm font-sans hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors duration-300"
                href={item.href}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Auth Links */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <Button asChild variant="outline">
                <Link
                  className="text-sm hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors duration-300"
                  href="/dashboard"
                >
                  Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Link
                  className="text-sm hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors duration-300"
                  href="/auth/signin"
                >
                  Login
                </Link>
                <Button asChild variant="outline">
                  <Link
                    className="text-sm border dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 hover:bg-slate-200 dark:hover:bg-neutral-800 px-3 py-1 rounded-md transition-colors duration-300"
                    href="/auth/signup"
                  >
                    Register
                  </Link>
                </Button>
              </>
            )}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <Menu
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
        >
          <div className="md:hidden bg-white dark:bg-black h-full w-full">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {Navdata.map((item) => (
                <Link
                  key={item.id}
                  className="block px-3 py-2 text-base font-medium hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors duration-300"
                  href={item.href}
                >
                  {item.title}
                </Link>
              ))}
              {!session && (
                <>
                  <Link
                    className="block px-3 py-2 text-base font-medium hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors duration-300"
                    href="/auth/signin"
                  >
                    Login
                  </Link>
                  <Link
                    className="block px-3 py-2 text-base font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-300"
                    href="/auth/signup"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
