import { Shield, Mail, FileText } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import { MetaTags } from "@/components/meta-tags";

export default function TermsConditions() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background">
      <MetaTags
        title="Terms & Conditions - ATS Score Checker Free"
        description="Read our Terms & Conditions to understand the rules and guidelines for using our free ATS resume analyzer tool."
        canonicalUrl="https://www.atsscorecheckerfree.com/terms-conditions"
        keywords="terms and conditions, user agreement, ATS analyzer terms, legal terms, service agreement"
      />
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 lg:h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-2 lg:gap-3">
            <Link href="/" className="flex items-center gap-2 lg:gap-3">
              <div className="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg lg:rounded-xl">
                <Shield className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg lg:text-xl font-bold text-gray-900 leading-tight">
                  ATS Resume Analyzer
                </h1>
                <p className="text-xs lg:text-sm text-gray-600">
                  AI-Powered Career Optimization
                </p>
              </div>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="flex items-center gap-1 lg:gap-2 px-2 lg:px-3"
          >
            <span className="text-xs lg:text-sm">Back to App</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Terms & Conditions
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Last updated: {currentYear}. Please read these terms carefully before using our service.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 lg:p-8 space-y-8">
          {/* Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing and using ATS Resume Analyzer ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this Service.
            </p>
          </section>

          {/* Description of Service */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-600 leading-relaxed">
              ATS Resume Analyzer is an AI-powered educational tool that provides automated analysis and suggestions for resume optimization. The Service analyzes uploaded resumes and provides insights regarding ATS compatibility, content quality, industry alignment, and improvement opportunities.
            </p>
          </section>

          {/* User Eligibility */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Eligibility</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              By using this Service, you represent and warrant that:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>You are at least 16 years of age</li>
              <li>You have the legal capacity to enter into these terms</li>
              <li>You will use the Service in compliance with all applicable laws and regulations</li>
              <li>All information you provide is accurate and truthful</li>
            </ul>
          </section>

          {/* User Accounts and Registration */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Accounts and Registration</h2>
            <p className="text-gray-600 leading-relaxed">
              Currently, our Service does not require user registration or account creation. You can use the Service by uploading your resume directly. We may introduce user accounts in the future, at which point additional terms will apply.
            </p>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Acceptable Use</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You agree not to use the Service for any purpose that is unlawful or prohibited by these terms. You may not use the Service:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>In any manner that could damage, disable, overburden, or impair the Service</li>
              <li>To upload content that contains viruses, malware, or other harmful code</li>
              <li>To upload resumes containing sensitive personal information (social security numbers, financial information, etc.)</li>
              <li>For any commercial purposes without our express written consent</li>
              <li>To violate any applicable local, state, national, or international law</li>
              <li>To impersonate any person or entity, or falsely state your affiliation with any person or entity</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">6.1 Our Intellectual Property</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              The Service and its original content, features, and functionality are owned by ATS Resume Analyzer and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">6.2 User Content</h3>
            <p className="text-gray-600 leading-relaxed">
              You retain all rights to the resumes and content you upload to the Service. By uploading content, you grant us a limited license to process and analyze that content solely for the purpose of providing the Service. We do not claim ownership of your uploaded content.
            </p>
          </section>

          {/* Privacy and Data Protection */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Privacy and Data Protection</h2>
            <p className="text-gray-600 leading-relaxed">
              Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information. By using the Service, you consent to the collection and use of information as described in our Privacy Policy.
            </p>
          </section>

          {/* Disclaimer of Warranties */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Disclaimer of Warranties</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Warranties of merchantability or fitness for a particular purpose</li>
              <li>Warranties regarding the accuracy, reliability, or completeness of the analysis</li>
              <li>Warranties that the Service will be uninterrupted, timely, secure, or error-free</li>
              <li>Warranties regarding the results that may be obtained from using the Service</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, ATS RESUME ANALYZER SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICE.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Indemnification</h2>
            <p className="text-gray-600 leading-relaxed">
              You agree to defend, indemnify, and hold harmless ATS Resume Analyzer and its operators from and against any claims, damages, obligations, losses, liabilities, costs, or debt, and expenses arising from your use of the Service or violation of these terms.
            </p>
          </section>

          {/* Service Modifications */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Service Modifications</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the Service.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Termination</h2>
            <p className="text-gray-600 leading-relaxed">
              We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms. Upon termination, your right to use the Service will cease immediately.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Governing Law</h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms shall be governed and construed in accordance with the laws of the jurisdiction where ATS Resume Analyzer operates, without regard to its conflict of law provisions.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Contact Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <span className="text-sm">support@atsanalyzer.com</span>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
