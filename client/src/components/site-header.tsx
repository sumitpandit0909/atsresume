import { Shield } from "lucide-react";
import { Link } from "wouter";

const navLinks = [
  { href: "/", label: "ATS Checker", className: "hidden sm:inline" },
  { href: "/blog", label: "Guides", className: "" },
  { href: "/features", label: "Features", className: "hidden md:inline" },
  { href: "/about", label: "About", className: "hidden md:inline" },
];

export default function SiteHeader() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex h-16 lg:h-20 items-center justify-between px-4 lg:px-12 gap-4">
        <Link href="/" className="flex items-center gap-2 lg:gap-3 min-w-0">
          <div className="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg lg:rounded-xl shrink-0">
            <Shield className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-base lg:text-xl font-bold text-gray-900 leading-tight truncate">
              ATS Score Checker Free
            </span>
            <span className="hidden sm:block text-xs lg:text-sm text-gray-600">
              Free Resume ATS Score Analysis
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-3 sm:gap-6 text-sm font-medium text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap hover:text-blue-600 transition-colors ${link.className}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
