import { Shield, Mail, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import { MetaTags } from "@/components/meta-tags";

export default function Dmca() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background">
      <MetaTags
        title="DMCA Policy - ATS Score Checker Free"
        description="Our DMCA Policy details how we handle copyright infringement claims and intellectual property rights on ATS Score Checker Free."
        canonicalUrl="https://www.atsscorecheckerfree.com/dmca"
        keywords="DMCA, copyright policy, intellectual property, takedown request"
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
            <AlertTriangle className="w-8 h-8 text-amber-600" />
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              DMCA Policy
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Last updated: {currentYear}. We respect the intellectual property rights of others.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 lg:p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Digital Millennium Copyright Act Notice</h2>
            <p className="text-gray-600 leading-relaxed">
              It is our policy to respond to clear notices of alleged copyright infringement in accordance with the Digital Millennium Copyright Act (DMCA). This page outlines the information required to submit a valid DMCA notice and our process for handling such notices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Designated Copyright Agent</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              All DMCA notices must be sent to our Designated Copyright Agent at the following email address:
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
              <p className="text-gray-900 font-medium">Email: <a href="mailto:support@atsanalyzer.com" className="text-blue-600 hover:underline">support@atsanalyzer.com</a></p>
              <p className="text-gray-600 mt-2">Please include "DMCA Notice" in the subject line of your email.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Elements of a Valid DMCA Notice</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              To file a copyright infringement notification with us, you must send a written communication that includes substantially the following items:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
              <li>Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works at a single online site are covered by a single notification, a representative list of such works.</li>
              <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate the material (e.g., providing URLs).</li>
              <li>Information reasonably sufficient to permit us to contact you, such as an address, telephone number, and, if available, an electronic mail address.</li>
              <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
              <li>A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Counter-Notification</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you believe that your material was removed (or access was disabled) by mistake or misidentification, you may file a counter-notice with our Designated Agent containing the following information:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Your physical or electronic signature.</li>
              <li>Identification of the material that has been removed or to which access has been disabled and the location at which the material appeared before it was removed or disabled.</li>
              <li>A statement under penalty of perjury that you have a good faith belief that the material was removed or disabled as a result of mistake or a misidentification of the material.</li>
              <li>Your name, address, telephone number, and email address, a statement that you consent to the jurisdiction of the federal court in your jurisdiction, and a statement that you will accept service of process from the person who provided notification of the alleged infringement.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Repeat Infringers</h2>
            <p className="text-gray-600 leading-relaxed">
              In accordance with the DMCA and other applicable law, we have adopted a policy of terminating, in appropriate circumstances and at our sole discretion, the accounts of users who are deemed to be repeat infringers. We may also at our sole discretion limit access to the service for any users who infringe any intellectual property rights of others, whether or not there is any repeat infringement.
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
