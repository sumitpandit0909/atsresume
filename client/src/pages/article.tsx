import { Fragment, useEffect, type ReactNode } from "react";
import { Link, useParams } from "wouter";
import { Clock, ArrowLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/site-header";
import Footer from "@/components/footer";
import { MetaTags } from "@/components/meta-tags";
import NotFound from "@/pages/not-found";
import { formatDate } from "@/pages/blog";
import { AUTHOR, articles, getArticle, type Article, type ArticleBlock } from "@/content/articles";

const SITE = "https://www.atsscorecheckerfree.com";

// Renders **bold** and [label](href) inside a line of article text.
function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={i}>{bold[1]}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      if (href.startsWith("/") && !href.includes("#")) {
        return <Link key={i} href={href}>{label}</Link>;
      }
      return <a key={i} href={href}>{label}</a>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return <p>{renderInline(block.text)}</p>;
    case "h2":
      return <h2>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "ul":
      return <ul>{block.items.map((item, i) => <li key={i}>{renderInline(item)}</li>)}</ul>;
    case "ol":
      return <ol>{block.items.map((item, i) => <li key={i}>{renderInline(item)}</li>)}</ol>;
    case "callout":
      return (
        <aside className="not-prose my-6 flex gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-gray-900 mb-1">{block.title}</p>
            <p className="text-gray-700">{renderInline(block.text)}</p>
          </div>
        </aside>
      );
    case "table":
      return (
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>{block.head.map((h, i) => <th key={i}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>{row.map((cell, c) => <td key={c}>{renderInline(cell)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

function structuredData(article: Article) {
  const url = `${SITE}/blog/${article.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      datePublished: article.published,
      dateModified: article.updated,
      author: { "@type": "Organization", name: AUTHOR, url: `${SITE}/about` },
      publisher: { "@type": "Organization", name: "ATS Score Checker Free", url: SITE },
      mainEntityOfPage: url,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
}

function ArticleView({ article }: { article: Article }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [article.slug]);

  const related = articles.filter((a) => a.slug !== article.slug);

  return (
    <div className="min-h-screen bg-background">
      <MetaTags
        title={article.metaTitle}
        description={article.description}
        canonicalUrl={`${SITE}/blog/${article.slug}`}
        keywords={article.keywords}
        structuredData={structuredData(article)}
      />
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-4 lg:px-8 py-10 lg:py-16">
        <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" /> All guides
        </Link>

        <article>
          <header className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
              <span>By {AUTHOR}</span>
              <time dateTime={article.updated}>Updated {formatDate(article.updated)}</time>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {article.readMinutes} min read
              </span>
            </div>
          </header>

          <div className="prose prose-gray prose-lg max-w-none prose-a:text-blue-600 prose-headings:text-gray-900">
            {article.body.map((block, i) => <Block key={i} block={block} />)}

            <h2>Frequently asked questions</h2>
            {article.faq.map((f, i) => (
              <Fragment key={i}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </Fragment>
            ))}
          </div>
        </article>

        <div className="mt-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 lg:p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Check your resume's ATS score</h2>
          <p className="text-blue-100 mb-5">Free, no signup. Upload a PDF or DOCX and get a category-by-category breakdown.</p>
          <Button
            onClick={() => (window.location.href = "/#upload-section")}
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
          >
            Open the ATS Score Checker
          </Button>
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">More guides</h2>
          <ul className="space-y-3">
            {related.map((a) => (
              <li key={a.slug}>
                <Link href={`/blog/${a.slug}`} className="text-blue-600 hover:underline">
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticle(slug ?? "");
  if (!article) return <NotFound />;
  return <ArticleView article={article} />;
}
