import { Mail } from "lucide-react";
import { Link } from "wouter";
import Footer from "@/components/footer";
import SiteHeader from "@/components/site-header";
import { MetaTags } from "@/components/meta-tags";

const CONTACT_EMAIL = "its.sumitpandit@gmail.com";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <MetaTags
        title="Contact Us – ATS Score Checker Free"
        description="Contact ATS Score Checker Free with questions, corrections, privacy requests or feedback about the resume checker and our guides."
        canonicalUrl="https://www.atsscorecheckerfree.com/contact"
        keywords="contact ats score checker free"
      />
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Contact us</h1>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Have a question about the checker, found a mistake in a guide, or want to make a privacy
          request? Send us an email.
        </p>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-5 text-blue-600 font-medium shadow-sm hover:border-blue-300 break-all"
        >
          <Mail className="w-5 h-5 shrink-0" />
          {CONTACT_EMAIL}
        </a>

        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">What to include</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
          <li><strong>Problems with the tool:</strong> your browser, your file type, and what happened.</li>
          <li><strong>Corrections:</strong> the page address and what needs changing.</li>
          <li><strong>Privacy requests:</strong> what you would like us to do. See our <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>.</li>
          <li><strong>Copyright notices:</strong> follow the steps in our <Link href="/dmca" className="text-blue-600 hover:underline">DMCA Policy</Link>.</li>
        </ul>

        <p className="text-gray-700 mt-8 leading-relaxed">
          Please do not email your resume or other sensitive personal information unless we ask for it.
        </p>
      </main>

      <Footer />
    </div>
  );
}
