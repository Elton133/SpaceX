"use client";

import { useState } from "react";
import { Menu, X, Rocket } from "lucide-react";
import Image from "next/image";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "API Docs", href: "/docs" },
  { name: "Features", href: "/features" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function SpaceXNavbarClient({ companyName }: { companyName: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-sm ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-around items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image
                src="/spacex.svg"
                alt="SpaceX Logo"
                width={250}
                height={120}
                priority />
            {/* <span className="font-sans font-bold text-xl text-white">{companyName}</span> */}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
            {/* <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-6 py-2 rounded-md transition-colors duration-200">
              Get Started
            </button> */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:bg-slate-800 p-2 rounded-md transition-colors duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-900/95 backdrop-blur-sm">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-gray-300 hover:bg-slate-800 rounded-md transition-colors duration-200 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            {/* <div className="px-3 py-2">
              <button
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 rounded-md transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
