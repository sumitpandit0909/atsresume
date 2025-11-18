import { Shield, Heart, Users, Target, Award, Globe, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";

export default function About() {
  const teamValues = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Our Mission",
      description: "To democratize access to ATS optimization tools and help job seekers overcome automated screening barriers."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Our Vision",
      description: "A world where every qualified candidate gets a fair chance to showcase their skills and experience."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Our Community",
      description: "Thousands of job seekers who trust our platform to optimize their resumes and advance their careers."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Impact",
      description: "Helping candidates worldwide navigate the complexities of modern job application systems."
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "Platform Launch",
      description: "Launched the first version of our free ATS score checker"
    },
    {
      year: "2024",
      title: "AI Integration",
      description: "Integrated advanced AI analysis for personalized recommendations"
    },
    {
      year: "2025",
      title: "Global Reach",
      description: "Expanded to serve job seekers in over 50 countries worldwide"
    },
    {
      year: "Future",
      title: "Continuous Innovation",
      description: "Ongoing development of new features and improvements"
    }
  ];

  const stats = [
    { number: "50K+", label: "Resumes Analyzed" },
    { number: "95%", label: "User Satisfaction" },
    { number: "85%", label: "Average Score Improvement" },
    { number: "50+", label: "Countries Served" }
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
            <Heart className="w-3 h-3 lg:w-4 lg:h-4 text-purple-600" />
            <span className="text-xs lg:text-sm font-medium text-gray-700">Our Story</span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            About
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}ATS Score Checker Free
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            We're on a mission to level the playing field for job seekers by providing free, accessible tools that help navigate the complex world of Applicant Tracking Systems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 lg:py-4 px-6 lg:px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Try Our Tool
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.href = '/features'}
              className="border-2 border-gray-300 text-gray-700 font-semibold py-3 lg:py-4 px-6 lg:px-8 rounded-xl hover:border-gray-400 transition-all duration-200"
            >
              View Features
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

      {/* Our Story Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Journey
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                ATS Score Checker Free was born from a simple observation: too many qualified candidates were being filtered out by automated systems before their resumes ever reached human eyes.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We recognized that while Applicant Tracking Systems help employers manage high volumes of applications, they often create barriers for talented individuals who don't understand how to optimize their resumes for these systems.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our platform was built to bridge this gap - providing free, accessible tools that help job seekers understand and improve their ATS compatibility, ensuring their qualifications get the attention they deserve.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Milestones</h3>
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-bold text-sm">
                      {milestone.year}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{milestone.title}</h4>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Values & Principles
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The core principles that guide everything we do at ATS Score Checker Free.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamValues.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Free Section */}
      <div className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why We're Free
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our commitment to providing free access to essential job search tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl text-blue-600 mx-auto mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Accessibility</h3>
              <p className="text-gray-600">
                We believe everyone should have access to tools that can help them succeed in their job search, regardless of their financial situation.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl text-purple-600 mx-auto mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Impact</h3>
              <p className="text-gray-600">
                By helping individuals improve their job prospects, we contribute to stronger communities and a more skilled workforce.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl text-green-600 mx-auto mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Focus</h3>
              <p className="text-gray-600">
                We're committed to providing the same high-quality analysis and insights that paid platforms offer, completely free of charge.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Technology
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our platform leverages cutting-edge technology to provide accurate, instant ATS compatibility analysis.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Advanced AI algorithms for precise analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Secure, privacy-first processing</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Real-time processing with instant results</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Global accessibility and multi-language support</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Our Commitment</h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                We're continuously improving our platform to provide the most accurate and helpful ATS optimization tools available.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Regular algorithm updates</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>New feature development</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>User feedback integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Industry trend monitoring</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
            Join our community of successful job seekers and take the first step toward optimizing your resume today.
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
              onClick={() => window.location.href = '/features'}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-xl transition-all duration-200"
            >
              Explore Features
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
