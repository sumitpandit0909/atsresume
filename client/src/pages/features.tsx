import { Shield, Brain, Sparkles, CheckCircle, Target, TrendingUp, Zap, Lock, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";

export default function Features() {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "ATS Compatibility Analysis",
      description: "Get detailed insights into how well your resume performs with major Applicant Tracking Systems used by Fortune 500 companies.",
      benefits: [
        "Formatting compatibility check",
        "Keyword optimization analysis",
        "Structure evaluation",
        "Content quality assessment"
      ]
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Insights",
      description: "Advanced artificial intelligence provides personalized recommendations to improve your resume's effectiveness.",
      benefits: [
        "Industry-specific suggestions",
        "Skill gap identification",
        "Career progression analysis",
        "Personalized improvement tips"
      ]
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Instant Scoring System",
      description: "Receive immediate ATS compatibility scores with detailed breakdowns across multiple categories.",
      benefits: [
        "0-100 overall score",
        "Category-specific ratings",
        "Benchmark comparisons",
        "Progress tracking"
      ]
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Industry Alignment",
      description: "Optimize your resume for specific industries and job roles with targeted recommendations.",
      benefits: [
        "Technology & IT optimization",
        "Healthcare compliance",
        "Marketing metrics focus",
        "Finance requirements"
      ]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Skill Gap Analysis",
      description: "Identify missing skills and qualifications that could improve your job application success.",
      benefits: [
        "Missing keyword detection",
        "Industry trend alignment",
        "Competitor analysis",
        "Growth opportunity identification"
      ]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Processing",
      description: "Get results instantly without waiting periods or processing delays.",
      benefits: [
        "Seconds to analyze",
        "No queue system",
        "Immediate feedback",
        "Quick iteration cycles"
      ]
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Privacy-First Approach",
      description: "Your resume data is processed securely and never stored or shared with third parties.",
      benefits: [
        "No data retention",
        "Secure file processing",
        "Anonymous analysis",
        "GDPR compliance"
      ]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "User-Friendly Interface",
      description: "Intuitive design that makes resume optimization accessible to everyone.",
      benefits: [
        "Simple upload process",
        "Clear visual feedback",
        "Easy-to-understand results",
        "Mobile responsive"
      ]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Comprehensive Analytics",
      description: "Detailed metrics and insights to help you understand and improve your resume performance.",
      benefits: [
        "Performance tracking",
        "Improvement metrics",
        "Success rate analysis",
        "Trend identification"
      ]
    }
  ];

  const stats = [
    { number: "98%", label: "ATS Compatibility Accuracy" },
    { number: "85%", label: "Average Score Improvement" },
    { number: "3x", label: "More Interview Callbacks" },
    { number: "94%", label: "User Satisfaction Rate" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex h-16 lg:h-20 items-center justify-between px-4 lg:px-12">
          <div className="flex items-center gap-2 lg:gap-3">
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
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full">
              <Shield className="w-3 h-3 lg:w-4 lg:h-4 text-green-600" />
              <span className="text-xs lg:text-sm font-medium text-gray-700">Secure</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full mb-6">
            <Sparkles className="w-3 h-3 lg:w-4 lg:h-4 text-purple-600" />
            <span className="text-xs lg:text-sm font-medium text-gray-700">Advanced Features</span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Powerful Features for
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Resume Success
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Discover the comprehensive suite of tools and features designed to optimize your resume for ATS compatibility and maximize your job application success.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 lg:py-4 px-6 lg:px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Try It Free
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.href = '/about'}
              className="border-2 border-gray-300 text-gray-700 font-semibold py-3 lg:py-4 px-6 lg:px-8 rounded-xl hover:border-gray-400 transition-all duration-200"
            >
              Learn About Us
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-sm lg:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Feature Set
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to optimize your resume and stand out in today's competitive job market.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8 hover:shadow-lg transition-all duration-200">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
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

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Optimize Your Resume?
          </h2>
          <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have improved their ATS scores and landed more interviews with our free tool.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.location.href = '/'}
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Start Free Analysis
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-xl transition-all duration-200"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
