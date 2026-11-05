import { Shield, Brain, FileText, Target, Lock, BookOpen, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import SiteHeader from "@/components/site-header";
import { MetaTags } from "@/components/meta-tags";

const features = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: "ATS compatibility score",
    description: "A score from 0 to 100, based on common issues that can make a resume harder for software and recruiters to read.",
    benefits: ["Overall score", "Breakdown by category", "Results in seconds", "No account needed"],
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Resume structure checks",
    description: "Finds missing sections, dates that are hard to follow, signs of table layouts and unusual characters.",
    benefits: ["Required and optional sections", "Work history dates", "Header and footer warnings", "Special characters"],
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Writing suggestions",
    description: "Points out weak or generic wording and explains why each suggestion matters.",
    benefits: ["Action verbs", "Measurable results", "Generic phrases", "Bullet points and density"],
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Optional AI analysis",
    description: "Ask for an AI review of your resume's content. Use it as a second opinion and check its advice against your own experience.",
    benefits: ["Strengths and weaknesses", "Possible skill gaps", "Industries your experience fits", "Improvement ideas"],
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: "Clear data handling",
    description: "The basic score runs in your browser. Resume text only leaves your device if you choose the AI analysis.",
    benefits: ["In-browser scoring", "AI analysis is opt-in", "No signup", "Explained in our Privacy Policy"],
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Practical guides",
    description: "Free articles on how applicant tracking systems read resumes, how to format yours and how to tailor it to a job.",
    benefits: ["Resume formatting", "Bullet point examples", "Tailoring to a posting", "Career gaps and first resumes"],
  },
];

export default function Features() {
  return (
    <div className="min-h-screen bg-background">
      <MetaTags
        title="Features – ATS Score Checker Free"
        description="See what our free ATS score checker does: a 0 to 100 score, structure and writing checks, optional AI analysis, and practical resume guides."
        canonicalUrl="https://www.atsscorecheckerfree.com/features"
        keywords="ats score checker features, ats checker, resume score checker"
      />
      <SiteHeader />

      <div className="py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">What the checker does</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            A free tool for finding common resume problems before you apply. It gives an estimate
            based on general checks, not a prediction of how any employer's system will rate you.
          </p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6">
              Check your resume
            </Button>
          </Link>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white mb-4">
                  {feature.icon}
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
