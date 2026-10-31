import { Link } from "wouter";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import SiteHeader from "@/components/site-header";
import Footer from "@/components/footer";
import { MetaTags } from "@/components/meta-tags";
import { articles } from "@/content/articles";

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <MetaTags
        title="ATS Resume Guides – ATS Score Checker Tips & Resume Advice"
        description="Practical guides on ATS score checkers, ATS-friendly resume formatting, resume parsing and keyword tailoring. Written to help job seekers get past applicant tracking systems."
        canonicalUrl="https://www.atsscorecheckerfree.com/blog"
        keywords="ats score checker, ats checker, ats resume checker, resume score checker, ats resume tips"
      />
      <SiteHeader />

      <div className="py-12 lg:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 border border-gray-200 rounded-full mb-6">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Resume & ATS Guides</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Guides to Beat the ATS
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Clear, practical advice on how applicant tracking systems read resumes, what an ATS score
            really means, and how to tailor your resume for each job.
          </p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group block bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                <time dateTime={article.published}>{formatDate(article.published)}</time>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {article.readMinutes} min read
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {article.title}
              </h2>
              <p className="text-gray-600 mb-4">{article.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                Read guide <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
