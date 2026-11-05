import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { articles } from "@/content/articles";

const checks = [
  { title: "Formatting", text: "Unusual symbols, signs of table layouts, and contact details that may sit in a header or footer." },
  { title: "Sections", text: "Whether standard headings such as Experience, Education and Skills can be found, plus optional ones such as Summary and Projects." },
  { title: "Dates", text: "Whether your work history includes dates that a reader or a parser can follow." },
  { title: "Writing", text: "Action verbs, measurable results, and generic phrases that say little about your work." },
  { title: "Layout and length", text: "Whether the text is long enough, split into scannable lines, and free of excessive capitals." },
  { title: "Optional AI review", text: "If you ask for it, an AI review of content quality, possible skill gaps and industries your experience fits." },
];

const faqs = [
  {
    q: "Is the ATS score checker free?",
    a: "Yes. The ATS score is free and does not need an account. The site is supported by advertising. The optional AI analysis is also free, but is limited per visitor because each review costs money to run.",
  },
  {
    q: "Is my resume uploaded?",
    a: "The basic score is calculated in your browser, so your file is not sent to our servers for that step. If you choose the AI analysis, the text extracted from your resume is sent through our server to our AI provider to generate the review. We do not save your resume on our servers.",
  },
  {
    q: "What score should I aim for?",
    a: "This tool labels 71 to 100 as excellent, 41 to 70 as needing work, and anything lower as needing significant changes. Treat those bands as a guide to what to fix first, not as a pass or fail result.",
  },
  {
    q: "Does this tool show how an employer's ATS will rate me?",
    a: "No. Employers configure their own systems and do not share how they rank applicants. This tool checks for common problems that make a resume harder for software and recruiters to read, so its score is an estimate and not a prediction.",
  },
  {
    q: "Does the score compare my resume with a job description?",
    a: "No. The score looks at the resume on its own. To match a specific job, compare your resume with the posting yourself using our keyword tailoring guide.",
  },
  {
    q: "Which file types can I check?",
    a: "PDF and DOCX. A PDF needs real, selectable text. A scanned image of a resume has no text for the tool, or for most applicant tracking systems, to read.",
  },
];

export default function HomeGuide() {
  return (
    <>
      <article id="ats-guide" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            How to use this ATS score checker
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            An Applicant Tracking System (ATS) is the software many employers use to collect
            applications and search them. It reads your resume into fields such as job titles,
            employers, dates and skills. If that goes badly, a recruiter may see a scrambled profile,
            or may not find you in a search, however good your experience is.
          </p>
          <p className="text-lg text-gray-700 mb-10 leading-relaxed">
            This checker looks for the common problems that cause trouble, then explains each one so
            you can decide what to change. No checker can see inside a particular employer's system,
            so use the result as a practical to-do list and not as a verdict.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-6">What the score looks at</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {checks.map((check) => (
              <div key={check.title} className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <h4 className="font-semibold text-gray-900 mb-2">{check.title}</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{check.text}</p>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Four steps to a better result</h3>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700 mb-10 leading-relaxed">
            <li>Upload your resume as a PDF or DOCX and read the score breakdown.</li>
            <li>Fix critical issues first, particularly missing sections, dates and hard-to-read layouts.</li>
            <li>Rewrite weak bullet points so each one says what you did and what changed as a result.</li>
            <li>Check the new version, then compare it with the job posting and use the employer's wording wherever it truthfully describes your experience.</li>
          </ol>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Guides for improving your resume</h3>
          <ul className="space-y-3 mb-10">
            {articles.map((article) => (
              <li key={article.slug}>
                <Link href={`/blog/${article.slug}`} className="text-blue-600 hover:underline">
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="bg-blue-600 text-white rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">Check your resume</h3>
            <p className="text-blue-100 mb-5">Free, with no signup. Your score appears as soon as the file is read.</p>
            <Button
              onClick={() => document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
            >
              Upload your resume
            </Button>
          </div>
        </div>
      </article>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently asked questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
