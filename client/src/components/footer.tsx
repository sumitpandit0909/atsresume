import { Shield, Mail, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">ATS Score Checker Free</h3>
                <p className="text-gray-300 text-sm">Free Resume ATS Score Analysis</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              A free tool and guide library for finding common resume problems before you apply,
              with no signup required.
            </p>
            <div className="flex items-center gap-2 text-gray-300">
              <Mail className="w-4 h-4" />
              <span className="text-sm">its.sumitpandit@gmail.com</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <a 
                  href="/#upload-section" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Analyze Resume
                </a>
              </li>
              <li>
                <Link 
                  href="/features" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  ATS Resume Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/privacy-policy" 
                  className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-1"
                >
                  Privacy Policy
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms-conditions" 
                  className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-1"
                >
                  Terms & Conditions
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link 
                  href="/disclaimer" 
                  className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-1"
                >
                  Disclaimer
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link 
                  href="/dmca" 
                  className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-1"
                >
                  DMCA Policy
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-300 text-sm">
              © {currentYear} ATS Score Checker Free. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-gray-300 text-sm">
              <Link 
                href="/privacy-policy" 
                className="hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link 
                href="/terms-conditions" 
                className="hover:text-white transition-colors"
              >
                Terms
              </Link>
              <Link 
                href="/disclaimer" 
                className="hover:text-white transition-colors"
              >
                Disclaimer
              </Link>
              <Link 
                href="/dmca" 
                className="hover:text-white transition-colors"
              >
                DMCA
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
