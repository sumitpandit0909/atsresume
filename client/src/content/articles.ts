// Blog articles. Inline text supports **bold** and [label](/internal-or-https-link).

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; title: string; text: string }
  | { type: "table"; head: string[]; rows: string[][] };

export interface Article {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  keywords: string;
  published: string;
  updated: string;
  readMinutes: number;
  excerpt: string;
  faq: { q: string; a: string }[];
  body: ArticleBlock[];
}

export const AUTHOR = "ATS Score Checker Free Editorial Team";

export const articles: Article[] = [
  {
    slug: "ats-score-checker-what-your-score-means",
    title: "ATS Score Checker: What Your Score Actually Means and How to Raise It",
    metaTitle: "ATS Score Checker: What Your Resume Score Means (2026 Guide)",
    description:
      "Learn what an ATS score checker measures, what a good ATS score is, why scores differ between tools, and a practical plan to raise your resume score before you apply.",
    keywords: "ats score checker, ats score, good ats score, resume ats score, free ats score checker",
    published: "2026-10-31",
    updated: "2026-10-31",
    readMinutes: 9,
    excerpt:
      "An ATS score is an estimate, not a verdict. Here is what the number really measures, what range to aim for, and the order in which to fix things.",
    faq: [
      {
        q: "What is a good score on an ATS score checker?",
        a: "Most checkers treat 80 or above as strong, 60–79 as workable with fixes, and below 60 as a sign that parsing or keyword problems are likely. Use the number to prioritise fixes, not as a pass/fail grade.",
      },
      {
        q: "Do employers see my ATS score?",
        a: "No. Third-party checkers like ours run on your copy of the resume. Employers' systems may rank or filter candidates in their own way, and those internal rankings are not shared with you.",
      },
      {
        q: "Why do different ATS checkers give different scores?",
        a: "Each tool weights formatting, keywords, sections and content differently. Compare the specific issues each tool flags rather than the headline number.",
      },
    ],
    body: [
      {
        type: "p",
        text: "If you have run your resume through an **ATS score checker**, you have probably seen a number like 64/100 and wondered what to do with it. Is 64 bad? Will an employer reject you automatically? Should you rewrite everything? This guide explains what that score represents, what it does not represent, and a practical order of operations for improving it without turning your resume into a keyword dump.",
      },
      { type: "h2", text: "What an ATS is, in plain terms" },
      {
        type: "p",
        text: "An Applicant Tracking System (ATS) is the software companies use to collect applications, store candidate data and move people through a hiring pipeline. Workday, Greenhouse, Lever, iCIMS, Taleo and SmartRecruiters are common examples. When you upload a resume, the ATS tries to **parse** it: it pulls out your name, contact details, job titles, employers, dates, education and skills, and stores them as structured fields that recruiters can search and filter.",
      },
      {
        type: "p",
        text: "Recruiters then search that database (for example, \"product manager\" + \"SQL\" + \"Bengaluru\") or review applicants for a specific opening. Some systems add knockout questions or a relevance ranking. In most cases, a human still makes the decision — but they only see what the system extracted and surfaced.",
      },
      {
        type: "callout",
        title: "A common myth",
        text: "You will often read that \"75% of resumes are rejected by ATS before a human sees them.\" That figure is widely repeated but poorly sourced. The more accurate picture: an ATS rarely 'rejects' you on its own, but a resume that parses badly or lacks the words a recruiter searches for is much easier to overlook.",
      },
      { type: "h2", text: "What an ATS score checker actually measures" },
      {
        type: "p",
        text: "No checker has access to a particular employer's private configuration, so every ATS score is an **estimate of readability and relevance**. A good checker looks at the same things that cause trouble in real systems:",
      },
      {
        type: "ul",
        items: [
          "**Parseability** — can the text be extracted cleanly, in the right order? Tables, text boxes, multi-column layouts, headers/footers and images are the usual culprits.",
          "**Section structure** — are standard headings present (Experience, Education, Skills, Summary) so the parser knows where each piece belongs?",
          "**Contact information** — is your email and phone number in the body of the document rather than in a header image?",
          "**Keywords and skills** — does the resume use the role-specific terms a recruiter is likely to search for?",
          "**Content quality** — are bullet points specific, action-led and backed by results, or vague and duty-based?",
          "**Length and density** — is there enough substance without being padded?",
        ],
      },
      {
        type: "p",
        text: "Our [free ATS score checker](/) groups these into categories so you can see *where* points were lost, not just how many. That breakdown matters more than the total.",
      },
      { type: "h2", text: "What is a good ATS score?" },
      {
        type: "table",
        head: ["Score range", "What it usually means", "What to do next"],
        rows: [
          ["80–100", "Clean structure, relevant keywords, strong bullets", "Tailor keywords for each job and apply"],
          ["60–79", "Readable, but missing keywords or weak sections", "Fix the lowest-scoring category first"],
          ["40–59", "Likely parsing or structure problems", "Simplify layout, add standard headings"],
          ["Below 40", "Text may not be extracting correctly", "Rebuild in a single-column, text-based format"],
        ],
      },
      {
        type: "p",
        text: "Treat these bands as guidance. A 72 for a resume tailored to one specific job can be more useful than an 88 for a generic resume that matches nothing in particular.",
      },
      { type: "h2", text: "Why your score differs between tools" },
      {
        type: "p",
        text: "It is normal to get 58 on one tool and 74 on another. Each tool weights categories differently, some compare against a job description and some do not, and some reward keyword frequency more heavily. The useful habit is to read the **specific issues** each tool flags. If two different checkers both say \"no Skills section detected\", that is a real problem. If only one complains about a keyword appearing too rarely, it is a judgement call.",
      },
      { type: "h2", text: "A step-by-step plan to raise your ATS score" },
      {
        type: "ol",
        items: [
          "**Fix parsing first.** Copy your resume text and paste it into a plain text editor. If the order is scrambled, dates are separated from roles, or sections are missing, the ATS is seeing the same mess. Move to a single-column layout and remove tables and text boxes.",
          "**Use standard section headings.** \"Work Experience\" beats \"Where I've Made an Impact\". Creative headings confuse parsers and recruiters skimming quickly.",
          "**Put contact details in the body.** Name, email, phone, city and LinkedIn URL as plain text at the top — not in the document header or footer.",
          "**Match the job description's language.** If the posting says \"stakeholder management\" and you wrote \"worked with teams\", use their phrase where it is truthful.",
          "**Add a focused Skills section.** List tools, methods and certifications as plain comma-separated text or short bullet lines.",
          "**Rewrite weak bullets.** Start with a strong verb, say what you did, and add a measurable result: \"Reduced invoice processing time from 5 days to 2 by automating approvals in SAP.\"",
          "**Re-check and compare.** Run the updated file through the checker again and confirm the categories you targeted actually improved.",
        ],
      },
      { type: "h2", text: "What not to do" },
      {
        type: "ul",
        items: [
          "Do not paste the job description in white text. Modern systems extract it, and recruiters see it — it looks dishonest.",
          "Do not repeat a keyword ten times. Relevance comes from context (the skill used in a real bullet), not raw frequency.",
          "Do not list skills you cannot discuss in an interview. Passing the filter only to fail the first call wastes everyone's time.",
          "Do not chase 100. Past roughly 85, extra points rarely change outcomes; tailoring and networking do.",
        ],
      },
      { type: "h2", text: "How to use our tool" },
      {
        type: "p",
        text: "Upload a PDF or DOCX on the [home page](/#upload-section). The basic ATS score is calculated in your browser, so your file does not need to leave your device for that step. If you choose the optional AI analysis, the extracted text is sent securely for a deeper review of content quality, skill gaps and industry fit — see our [Privacy Policy](/privacy-policy) for details. Then work through the category with the lowest score first.",
      },
      {
        type: "p",
        text: "Next, read [how an ATS checker reads your resume](/blog/how-ats-checker-reads-your-resume) to understand why formatting matters so much, or jump to our [ATS resume formatting rules](/blog/ats-resume-checker-formatting-rules).",
      },
    ],
  },
  {
    slug: "how-ats-checker-reads-your-resume",
    title: "How an ATS Checker Reads Your Resume (and Why Good Resumes Still Get Missed)",
    metaTitle: "How an ATS Checker Reads Your Resume: Parsing Explained",
    description:
      "See your resume the way an ATS checker does. We explain resume parsing step by step, the formatting choices that break it, and a 5-minute test you can run yourself.",
    keywords: "ats checker, ats resume parsing, how ats works, ats checker free, resume parsing",
    published: "2026-10-31",
    updated: "2026-10-31",
    readMinutes: 8,
    excerpt:
      "Most ATS problems are not about keywords — they are about the system failing to read your resume correctly. Here is what happens behind the upload button.",
    faq: [
      {
        q: "Can an ATS read a PDF resume?",
        a: "Yes, most modern systems read text-based PDFs well. Problems arise with scanned PDFs (images of text), PDFs exported from design tools with text converted to outlines, and complex multi-column layouts.",
      },
      {
        q: "Is DOCX or PDF better for an ATS?",
        a: "Both work when they are simple and text-based. Follow the employer's instructions if they specify a format; otherwise a clean PDF preserves your layout and a DOCX is the safest fallback for older systems.",
      },
      {
        q: "Do ATS systems read headers and footers?",
        a: "Some do, many do not reliably. Keep your name and contact details in the main body of the document.",
      },
    ],
    body: [
      {
        type: "p",
        text: "You can be an excellent candidate with a well-written resume and still be invisible in an applicant tracking system. The reason is usually not your experience — it is how the software **reads** the file. An **ATS checker** simulates that reading step so you can catch problems before a real system does. Here is what happens when you click \"Upload\".",
      },
      { type: "h2", text: "Step 1: Text extraction" },
      {
        type: "p",
        text: "The ATS first pulls raw text out of your file. With a DOCX, it reads the document's underlying XML. With a PDF, it reads the text layer — the characters and their positions on the page. If there is no text layer (a scanned page or a resume exported as an image), there is nothing to read and many systems will store an almost empty profile.",
      },
      {
        type: "callout",
        title: "Quick test",
        text: "Open your PDF and try to select a sentence with your cursor. If you cannot highlight individual words, the ATS cannot read them either.",
      },
      { type: "h2", text: "Step 2: Reading order" },
      {
        type: "p",
        text: "Next the parser decides what order the text belongs in. People read a two-column resume left column first, then right. Software often reads straight across the page, line by line, interleaving the two columns. Your sidebar skills end up glued to the middle of a job description, and dates float away from the roles they belong to.",
      },
      {
        type: "p",
        text: "Tables cause similar trouble: some parsers read cell by cell, others row by row, and some skip table content entirely. Text boxes and shapes are frequently ignored.",
      },
      { type: "h2", text: "Step 3: Section detection" },
      {
        type: "p",
        text: "Once the text is in order, the system looks for headings to split it into sections. It recognises common labels — Summary, Experience, Work History, Education, Skills, Certifications, Projects. A heading like \"My Journey\" or an icon instead of a word gives it nothing to match, so your entire work history may be filed under the wrong section or dropped into a generic notes field.",
      },
      { type: "h2", text: "Step 4: Field extraction" },
      {
        type: "p",
        text: "Within each section the parser tries to identify entities: job title, employer, location, start date, end date, degree, institution, skill names. Consistency helps enormously here.",
      },
      {
        type: "ul",
        items: [
          "Use one date format throughout, such as \"Jan 2023 – Mar 2025\" or \"01/2023 – 03/2025\".",
          "Put the job title and employer on predictable lines, in the same order for every role.",
          "Write \"Present\" for current roles rather than leaving the end date blank.",
          "Spell out abbreviations at least once: \"Search Engine Optimization (SEO)\".",
        ],
      },
      { type: "h2", text: "Step 5: Search and ranking" },
      {
        type: "p",
        text: "Finally, your structured profile sits in a database alongside every other applicant. Recruiters filter and search it, and some systems score candidates against the job requirements. This is where keywords matter: if the role requires \"Python\" and \"data pipelines\" and neither appears in your extracted text, you will not show up in that search — even if you have done exactly that work.",
      },
      { type: "h2", text: "Formatting choices that commonly break parsing" },
      {
        type: "table",
        head: ["Element", "Risk", "Safer alternative"],
        rows: [
          ["Two or three columns", "Text read out of order", "Single column, left-aligned"],
          ["Tables for layout", "Cells skipped or merged", "Plain lines with consistent spacing"],
          ["Contact info in header/footer", "Name and email not captured", "Contact block at top of body"],
          ["Icons for phone/email", "Icons become garbage characters", "Write \"Email:\" and \"Phone:\""],
          ["Skill bars or rating charts", "Images carry no text", "List skills as words"],
          ["Unusual fonts", "Characters mis-mapped", "Arial, Calibri, Georgia, Helvetica"],
          ["Creative headings", "Section not detected", "Experience, Education, Skills"],
        ],
      },
      { type: "h2", text: "The 5-minute self-test" },
      {
        type: "ol",
        items: [
          "Select all the text in your resume and paste it into Notepad or any plain text editor.",
          "Check that your name, email and phone appear at the top.",
          "Read through: is each job title next to its employer and dates?",
          "Confirm every section heading is present as a word.",
          "Run the same file through our [ATS checker](/) and compare its section and formatting findings with what you saw.",
        ],
      },
      {
        type: "p",
        text: "If the plain-text version reads cleanly, you have solved the hardest part. From there, improvements come from content and keywords — covered in our guide to [tailoring with a resume score checker](/blog/resume-score-checker-keyword-tailoring).",
      },
      { type: "h2", text: "Does a beautiful design hurt you?" },
      {
        type: "p",
        text: "Not always. Many modern systems handle reasonable designs well, and a visually polished resume helps once a human is reading it. The safe approach is to keep two versions: a clean, single-column version for online applications and ATS portals, and a designed version for networking, email introductions and interviews.",
      },
    ],
  },
  {
    slug: "ats-resume-checker-formatting-rules",
    title: "ATS Resume Checker Guide: 12 Formatting Rules That Pass Applicant Tracking Systems",
    metaTitle: "ATS Resume Checker: 12 Formatting Rules That Actually Work",
    description:
      "A practical checklist of 12 ATS-friendly resume formatting rules — layout, fonts, headings, dates, file type and more — with examples you can apply in under an hour.",
    keywords: "ats resume checker, ats friendly resume format, ats resume format, ats resume checker free",
    published: "2026-10-31",
    updated: "2026-10-31",
    readMinutes: 10,
    excerpt:
      "Twelve formatting rules that keep your resume readable for applicant tracking systems without making it look plain or generic.",
    faq: [
      {
        q: "Should an ATS-friendly resume be one page?",
        a: "Length is less important to an ATS than structure. As a guideline, one page suits early-career candidates and two pages suits most experienced professionals. Senior or academic roles can justify more.",
      },
      {
        q: "Can I use bold and italics?",
        a: "Yes. Bold, italics and simple horizontal lines are safe. Avoid text boxes, tables used for layout, images and graphics that carry information.",
      },
      {
        q: "Are resume templates ATS-friendly?",
        a: "Some are, many are not. Run any template through an ATS resume checker before using it and check that the plain-text output reads in the correct order.",
      },
    ],
    body: [
      {
        type: "p",
        text: "Formatting is the part of resume writing that feels least important and causes the most ATS problems. The good news: it is also the easiest to fix. These twelve rules come from the issues an **ATS resume checker** flags most often. Apply them once, save the result as your master resume, and every tailored version you create afterwards inherits a clean structure.",
      },
      { type: "h2", text: "Layout and structure" },
      { type: "h3", text: "1. Use a single-column layout" },
      {
        type: "p",
        text: "One column, left-aligned, top to bottom. This is the single biggest improvement for most resumes, because it guarantees the reading order the software sees matches the order you intended.",
      },
      { type: "h3", text: "2. Use standard section headings" },
      {
        type: "p",
        text: "Stick to recognisable labels: **Summary**, **Experience** (or Work Experience), **Education**, **Skills**, **Certifications**, **Projects**. You can style them in bold or a slightly larger size; just keep the words conventional.",
      },
      { type: "h3", text: "3. Order sections by relevance" },
      {
        type: "p",
        text: "Experienced candidates: Summary → Experience → Skills → Education. Students and recent graduates: Summary → Education → Projects → Experience → Skills. Career changers can lead with a Skills or Relevant Projects section to put transferable ability up front.",
      },
      { type: "h3", text: "4. Keep contact details in the body" },
      {
        type: "p",
        text: "Your name, phone, email, city/region and LinkedIn URL should sit as plain text at the very top of page one, not inside the document's header or footer area. Skip your full street address; city and country are enough.",
      },
      { type: "h2", text: "Text and typography" },
      { type: "h3", text: "5. Choose a common font" },
      {
        type: "p",
        text: "Arial, Calibri, Helvetica, Georgia, Garamond and Cambria are all safe. Use 10–12pt for body text and 14–16pt for your name. Decorative or icon fonts can map to the wrong characters when extracted.",
      },
      { type: "h3", text: "6. Use simple bullets" },
      {
        type: "p",
        text: "Standard round bullets or hyphens parse reliably. Custom symbols, arrows, emoji and check-mark icons sometimes turn into question marks or disappear.",
      },
      { type: "h3", text: "7. Write skills as words, not graphics" },
      {
        type: "p",
        text: "Progress bars, star ratings and pie charts look tidy but contain no readable text. Replace them with a plain list, grouped if helpful: \"Languages: Python, SQL, TypeScript · Tools: Airflow, dbt, Tableau\".",
      },
      { type: "h3", text: "8. Spell out acronyms once" },
      {
        type: "p",
        text: "Recruiters might search for either form. Write \"Customer Relationship Management (CRM)\" the first time, then use CRM. The same goes for certifications: \"Project Management Professional (PMP)\".",
      },
      { type: "h2", text: "Dates, titles and details" },
      { type: "h3", text: "9. Keep dates consistent" },
      {
        type: "p",
        text: "Pick one format and use it everywhere: \"Jun 2022 – Present\". Place dates on the same line as the job title or directly below it, in the same position for every role. Consistency helps the parser link each date range to the right job.",
      },
      { type: "h3", text: "10. Give every role the same structure" },
      {
        type: "p",
        text: "Job Title — Company, City — Dates, followed by 3–6 bullets. When each entry follows the same pattern, both software and people can scan it quickly.",
      },
      { type: "h2", text: "Files and submission" },
      { type: "h3", text: "11. Submit a text-based PDF or DOCX" },
      {
        type: "p",
        text: "Export your PDF directly from Word, Google Docs or a similar editor so the text layer is preserved. Avoid scanned PDFs and design-tool exports that convert text to shapes. If the application asks for a specific format, follow it.",
      },
      { type: "h3", text: "12. Use a clear file name" },
      {
        type: "p",
        text: "\"Priya-Sharma-Data-Analyst-Resume.pdf\" is better than \"resume_final_v7.pdf\". It does not change your ATS score, but recruiters download and forward files, and a clear name looks professional.",
      },
      { type: "h2", text: "Before and after: a quick example" },
      {
        type: "table",
        head: ["Before", "After"],
        rows: [
          ["Two-column template, skills in a sidebar with rating bars", "Single column, Skills section with plain text list"],
          ["Heading: \"Career Highlights\"", "Heading: \"Experience\""],
          ["Email shown as an envelope icon in the header", "\"Email: name@example.com\" in the first lines of the body"],
          ["Dates: \"2021–now\", \"Mar '19 to Jan '21\"", "Dates: \"Jan 2021 – Present\", \"Mar 2019 – Jan 2021\""],
        ],
      },
      { type: "h2", text: "Checklist" },
      {
        type: "ul",
        items: [
          "Single column, no tables or text boxes",
          "Standard headings: Summary, Experience, Education, Skills",
          "Contact details as text at the top of the body",
          "Common font, 10–12pt body text",
          "Plain bullets, no icons or graphics carrying information",
          "Acronyms spelled out once",
          "One consistent date format",
          "Text-based PDF or DOCX with a clear file name",
        ],
      },
      {
        type: "p",
        text: "When you have applied the checklist, upload the file to our [ATS resume checker](/#upload-section) and confirm the formatting category scores well. Then move on to content: our guide on [what your ATS score means](/blog/ats-score-checker-what-your-score-means) explains how to prioritise the remaining fixes.",
      },
    ],
  },
  {
    slug: "resume-score-checker-keyword-tailoring",
    title: "Resume Score Checker Workflow: Tailor Your Resume to Any Job in 30 Minutes",
    metaTitle: "Resume Score Checker: Tailor Your Resume to a Job in 30 Minutes",
    description:
      "Use a resume score checker the right way: extract keywords from a job description, map them to real experience, rewrite bullets and re-check — a repeatable 30-minute workflow.",
    keywords: "resume score checker, resume checker, tailor resume to job description, resume keywords, ats keywords",
    published: "2026-10-31",
    updated: "2026-10-31",
    readMinutes: 9,
    excerpt:
      "A repeatable workflow for tailoring your resume to a specific job using a resume score checker — without keyword stuffing or exaggeration.",
    faq: [
      {
        q: "How many keywords should a resume include?",
        a: "There is no magic number. Aim to cover the core requirements in the job posting — usually 8 to 15 key skills or phrases — each used naturally in context at least once.",
      },
      {
        q: "Should I tailor my resume for every application?",
        a: "For roles you genuinely want, yes. Keep a master resume and spend 20–30 minutes adapting the summary, skills and top bullets for each posting.",
      },
      {
        q: "Is it okay to copy phrases from the job description?",
        a: "Using the employer's terminology for skills you really have is good practice. Copying whole sentences or claiming skills you lack is not.",
      },
    ],
    body: [
      {
        type: "p",
        text: "A generic resume tries to fit every job and ends up matching none of them particularly well. Tailoring fixes that, but it can feel like rewriting your whole resume for every application. It does not have to. With a master resume and a **resume score checker**, you can adapt your application to a specific posting in about 30 minutes. Here is the workflow.",
      },
      { type: "h2", text: "Before you start: build a master resume" },
      {
        type: "p",
        text: "Your master resume is a longer, private document that holds everything: every role, project, tool, certification and achievement, with several bullet options for each job. You never send it. Instead, you copy from it into a clean, ATS-friendly template (see our [formatting rules](/blog/ats-resume-checker-formatting-rules)) for each application.",
      },
      { type: "h2", text: "Step 1 (5 minutes): Extract keywords from the job description" },
      {
        type: "p",
        text: "Read the posting and highlight three kinds of terms:",
      },
      {
        type: "ul",
        items: [
          "**Hard skills and tools** — Excel, Salesforce, Python, Figma, GAAP, Kubernetes.",
          "**Functional phrases** — \"stakeholder management\", \"vendor negotiation\", \"A/B testing\", \"month-end close\".",
          "**Qualifications** — degree, certifications, years of experience, languages, domain (e.g. \"B2B SaaS\", \"healthcare\").",
        ],
      },
      {
        type: "p",
        text: "Pay attention to anything repeated, anything in the job title, and anything listed under \"Requirements\" rather than \"Nice to have\". Those are the terms most likely to be searched.",
      },
      { type: "h2", text: "Step 2 (5 minutes): Map keywords to real experience" },
      {
        type: "p",
        text: "Make a quick two-column list: the keyword on the left, where you have genuinely used it on the right. Be honest. You will end up with three groups:",
      },
      {
        type: "table",
        head: ["Group", "Example", "Action"],
        rows: [
          ["Have it, already on resume", "SQL", "Make sure it appears in a bullet, not just the skills list"],
          ["Have it, missing from resume", "\"Vendor management\" — you did this but called it \"supplier coordination\"", "Use the employer's wording"],
          ["Do not have it", "Kubernetes", "Leave it out; address related experience instead"],
        ],
      },
      { type: "h2", text: "Step 3 (10 minutes): Rewrite the summary and top bullets" },
      {
        type: "p",
        text: "You do not need to change everything. Focus on the parts recruiters read first:",
      },
      {
        type: "ol",
        items: [
          "**Headline/summary:** mirror the job title and two or three core requirements. \"Financial analyst with 5 years in FP&A, specialising in month-end close, variance analysis and Power BI reporting.\"",
          "**Skills section:** reorder so the posting's must-haves come first.",
          "**Most recent role:** rewrite two or three bullets to show the required skills in action, with results.",
        ],
      },
      {
        type: "callout",
        title: "A strong bullet formula",
        text: "Action verb + what you did + tool or method + measurable result. Example: \"Built a Power BI variance dashboard used by 6 regional managers, cutting monthly reporting time by 40%.\"",
      },
      { type: "h2", text: "Step 4 (5 minutes): Check with a resume score checker" },
      {
        type: "p",
        text: "Upload the tailored version to our [resume score checker](/#upload-section). Look at three things:",
      },
      {
        type: "ul",
        items: [
          "Did the **keyword and skills** category improve compared with your generic version?",
          "Is **formatting** still clean after your edits (no new tables, consistent dates)?",
          "Does the optional **AI analysis** flag skill gaps you could address truthfully, or weak bullets you missed?",
        ],
      },
      { type: "h2", text: "Step 5 (5 minutes): Human read-through" },
      {
        type: "p",
        text: "Read the final version out loud, or ask a friend to skim it for 30 seconds. Software checks structure and terms; people check whether the story makes sense. If a sentence sounds like it was written for a robot, rewrite it for a person. Remember that the goal of passing the ATS is to reach a recruiter — and the recruiter decides whether you get the interview.",
      },
      { type: "h2", text: "Common tailoring mistakes" },
      {
        type: "ul",
        items: [
          "**Keyword stuffing** — repeating terms unnaturally or adding a block of keywords at the bottom. It reads badly and many systems weigh context, not count.",
          "**Claiming skills you lack** — it may get you past the filter, but it will surface in interviews or reference checks.",
          "**Changing job titles** — you can add clarity (\"Software Engineer (Backend)\") but do not invent titles you did not hold.",
          "**Forgetting the cover letter** — if one is requested, align it with the same three or four core requirements.",
        ],
      },
      { type: "h2", text: "Putting it together" },
      {
        type: "p",
        text: "Tailoring is not about gaming software. It is about describing your real experience in the language the employer uses, so both their ATS and their recruiter can see the match quickly. Use the checker to catch what you missed, then trust your judgement. If you are new to ATS scores, start with [what your ATS score means](/blog/ats-score-checker-what-your-score-means) and [how an ATS checker reads your resume](/blog/how-ats-checker-reads-your-resume).",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
