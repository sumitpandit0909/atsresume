import { Shield, Mail, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import { MetaTags } from "@/components/meta-tags";

export default function PrivacyPolicy() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background">
      <MetaTags
        title="Privacy Policy - ATS Score Checker Free"
        description="Read our Privacy Policy to understand how we protect your data and ensure privacy when using our free ATS resume analyzer tool."
        canonicalUrl="https://www.atsscorecheckerfree.com/privacy-policy"
        keywords="privacy policy, data protection, resume privacy, ATS analyzer privacy, data security"
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
                  ATS Score Checker Free
                </h1>
                <p className="text-xs lg:text-sm text-gray-600">
                  Free Resume ATS Score Analysis
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
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Last updated: {currentYear}. We are committed to protecting your privacy and being transparent about our data practices.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 lg:p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to ATS Score Checker Free ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered resume analysis service.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              By using our service, you consent to the data practices described in this policy. If you do not agree with the terms of this Privacy Policy, please do not access or use our service.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">2.1 Personal Information</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              When you use our service, we may collect the following types of personal information:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Resume Content:</strong> The text and content of resumes you upload for analysis</li>
              <li><strong>File Information:</strong> File names, sizes, and types of uploaded documents</li>
              <li><strong>Contact Information:</strong> Email address if you choose to contact us</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our service</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">How your resume is processed</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              The basic ATS score is calculated in your browser, so your file is not sent to our servers for that step. If you choose the optional AI analysis, the text extracted from your resume is sent through our server to our AI provider, OpenRouter, and the AI model it routes to, in order to generate your review. We do not save your resume on our servers, but those providers handle the text under their own policies. To limit AI requests, we temporarily process your IP address.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">2.2 Automatically Collected Information</h3>
            <p className="text-gray-600 leading-relaxed">
              We automatically collect certain information when you visit our website, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mt-2">
              <li>IP address and browser type</li>
              <li>Device information and operating system</li>
              <li>Pages visited and time spent on our service</li>
              <li>Referring website addresses</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Service Provision:</strong> To provide AI-powered resume analysis and generate insights</li>
              <li><strong>Improvement:</strong> To enhance and optimize our service features</li>
              <li><strong>Communication:</strong> To respond to your inquiries and provide support</li>
              <li><strong>Analytics:</strong> To understand how users interact with our service</li>
              <li><strong>Security:</strong> To protect against fraudulent or unauthorized activity</li>
            </ul>
          </section>

          {/* Data Sharing and Disclosure */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Sharing and Disclosure</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our service. If you choose the optional AI analysis, the text extracted from your resume is sent to our AI provider (OpenRouter) solely to generate your analysis.</li>
              <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Objection:</strong> Object to processing of your personal information</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service</li>
            </ul>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookies and Tracking Technologies</h2>
            <p className="text-gray-600 leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Advertising (Google AdSense)</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use Google AdSense to display advertisements. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visits to this site and/or other sites on the Internet.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>You may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Ads Settings</a>.</li>
              <li>You can also opt out of some third-party vendors' use of cookies for personalized advertising at <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.aboutads.info</a>.</li>
              <li>Learn more in <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">How Google uses information from sites or apps that use its services</a>.</li>
            </ul>
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Analytics</h3>
            <p className="text-gray-600 leading-relaxed">
              We use Google Analytics to understand how visitors use the site (for example, pages visited and time on site). Google Analytics uses cookies and reports data in aggregated form. You can opt out using the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Analytics Opt-out Browser Add-on</a>.
            </p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Third-Party Services</h2>
            <p className="text-gray-600 leading-relaxed">
              Our service may contain links to third-party websites or services that are not operated by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-600 leading-relaxed">
              Our service is not intended for individuals under the age of 16. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
          </section>

          {/* Changes to This Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <span className="text-sm">its.sumitpandit@gmail.com</span>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
