# ClientSideResume - AI-Powered ATS Resume Analyzer

![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-orange)
![Vite](https://img.shields.io/badge/Vite-4.4-purple)

A modern, AI-powered resume analysis tool that helps job seekers optimize their resumes for Applicant Tracking Systems (ATS). Get detailed insights, industry alignment scores, and actionable improvement suggestions powered by AI.

## 🚀 Features

### 🤖 AI-Powered Analysis
- **Comprehensive Resume Analysis**: Deep analysis of your resume content, structure, and formatting
- **ATS Optimization**: Identify ATS-friendly improvements and keyword optimization
- **Industry Alignment**: Get industry-specific suggestions and alignment scores
- **Skill Gap Analysis**: Discover missing skills and development recommendations

### 📊 Detailed Insights
- **Content Quality Scoring**: Overall assessment with strengths and weaknesses
- **Industry Suggestions**: Recommended industries based on your experience
- **Improvement Roadmap**: Actionable suggestions for resume enhancement
- **ATS Compatibility**: Tips to improve ATS parsing success

### 💾 Export & Download
- **PNG Export**: High-quality screenshot of your analysis results
- **PDF Export**: Professional PDF document with your analysis
- **HTML Export**: Clean HTML format for easy sharing

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Beautiful Animations**: Smooth loading animations and transitions
- **Intuitive Interface**: Clean, user-friendly design with clear navigation
- **Real-time Progress**: Visual progress indicator during AI analysis

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful icons
- **HTML2Canvas** - Screenshot functionality
- **jsPDF** - PDF generation

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **DeepSeek AI** - AI analysis integration
- **File Processing** - PDF and DOCX parsing

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Drizzle** - Database ORM
- **PostCSS** - CSS processing

## 📦 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sumitpandit0909/ats.git
   cd ClientSideResume
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in root directory
   # Add your DeepSeek API key
   DEEPSEEK_API_KEY=your_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## 🎯 Usage Guide

### 1. Upload Your Resume
- Click the upload zone on the homepage
- Supported formats: PDF, DOCX
- Drag and drop or click to browse files

### 2. AI Analysis Process
- **Parsing**: Extracting and organizing resume content
- **Experience Analysis**: Reviewing work history and achievements
- **Skills Evaluation**: Assessing technical and soft skills
- **Insights Generation**: Creating personalized recommendations
- **ATS Optimization**: Checking ATS compatibility
- **Final Report**: Preparing comprehensive analysis

### 3. Review Results
- **Overall Assessment**: High-level summary of your resume
- **Content Quality**: Detailed scoring with strengths and weaknesses
- **Industry Alignment**: Industry-specific suggestions and scores
- **Skill Gaps**: Missing skills and development recommendations
- **Improvement Suggestions**: Actionable steps for enhancement
- **ATS Optimization**: Tips for better ATS performance

### 4. Download Reports
- **PNG**: Screenshot of analysis results
- **PDF**: Professional PDF document
- Use the download button at the bottom right of the results page

## 🏗️ Project Structure

```
ClientSideResume/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utility libraries
│   │   └── hooks/          # Custom React hooks
├── server/                 # Backend Express server
│   ├── routes/             # API routes
│   └── lib/                # Server utilities
├── shared/                 # Shared types and schemas
└── public/                 # Static assets
```

### Key Components

- **`AILoadingModal`**: Animated loading screen during AI analysis
- **`AIResultsPage`**: Comprehensive results display with download options
- **`UploadZone`**: File upload component with drag-and-drop
- **`download-utils`**: Export functionality for PNG, PDF, and HTML

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# AI Service Configuration
DEEPSEEK_API_KEY=your_deepseek_api_key

# Server Configuration
PORT=3000
NODE_ENV=development
```

### Customization

The application can be customized through:

- **TailwindCSS**: Modify `tailwind.config.js` for styling
- **Components**: Customize UI components in `client/src/components/`
- **Analysis Logic**: Modify AI integration in `server/lib/deepseek-service.ts`

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Deployment Options

- **Vercel**: Zero-config deployment for React apps
- **Netlify**: Simple static site deployment
- **Docker**: Containerized deployment
- **Traditional Hosting**: Any static file hosting service

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use TailwindCSS for styling
- Write meaningful commit messages
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/sumitpandit0909/ats/issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce and expected behavior

## 🙏 Acknowledgments

- **DeepSeek AI** for providing the AI analysis capabilities
- **React Community** for excellent documentation and tools
- **TailwindCSS** for the utility-first CSS framework
- **Vite** for the fast build tool and development experience

---

**Built with ❤️ using modern web technologies to help job seekers succeed in their career journey.**
