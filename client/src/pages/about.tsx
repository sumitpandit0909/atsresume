import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import SiteHeader from "@/components/site-header";
import { MetaTags } from "@/components/meta-tags";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <MetaTags
        title="About – ATS Score Checker Free"
        description="ATS Score Checker Free is a free resume tool and guide library. Learn what it does, how it is funded, how it treats your resume, and what it cannot do."
        canonicalUrl="https://www.atsscorecheckerfree.com/about"
        keywords="about ats score checker free, free ats checker"
      />
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">About ATS Score Checker Free</h1>

        <div className="prose prose-gray prose-lg max-w-none prose-a:text-blue-600">
          <p>
            ATS Score Checker Free is a free web tool that helps job seekers find common problems in
            their resumes before they apply. You can upload a PDF or DOCX file and get a score with
            specific suggestions, without creating an account.
          </p>

          <h2>Why this site exists</h2>
          <p>
            Most advice about applicant tracking systems is either vague or written to sell a
            subscription. We wanted a simple tool and plain explanations that anyone can use, whatever
            their budget.
          </p>

          <h2>What you can do here</h2>
          <ul>
            <li>
              <strong>Check your resume.</strong> The <Link href="/">ATS score checker</Link> looks at
              formatting, sections, dates and writing.
            </li>
            <li>
              <strong>Get a second opinion.</strong> The optional AI analysis reviews your resume's
              content and suggests improvements.
            </li>
            <li>
              <strong>Learn how it works.</strong> Our <Link href="/blog">guides</Link> explain how
              these systems read resumes and how to improve yours.
            </li>
          </ul>

          <h2>What the tool cannot do</h2>
          <p>
            No outside tool can see how a particular employer has configured its system, so our score
            is an estimate based on general checks. A high score does not guarantee an interview, and
            a lower one does not mean you will be rejected. Our AI analysis can also make mistakes, so
            use your own judgement. See our <Link href="/disclaimer">Disclaimer</Link> for details.
          </p>

          <h2>How our content is made</h2>
          <p>
            Our guides are prepared with the help of AI writing tools. They aim to give practical,
            general advice, and they link to sources when they make claims about specific products.
            If you find a mistake, please <Link href="/contact">tell us</Link> and we will correct it.
          </p>

          <h2>How the site is funded</h2>
          <p>
            The tool is free to use. We use advertising to help cover running costs, as explained in
            our <Link href="/privacy-policy">Privacy Policy</Link>.
          </p>

          <h2>Your resume and your privacy</h2>
          <p>
            The basic score is calculated in your browser. Your resume text only leaves your device if
            you choose the AI analysis, when it is sent through our server to our AI provider to
            generate the review. We do not save your resume on our servers.
          </p>

          <h2>Contact us</h2>
          <p>
            Questions, corrections and feedback are welcome on our{" "}
            <Link href="/contact">contact page</Link>.
          </p>
        </div>

        <div className="mt-10">
          <Link href="/">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6">
              Check your resume
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
