import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Quote } from 'lucide-react';

/**
 * Reusable Publication-Grade Article Content Renderer.
 *
 * Converts Markdown headings, bold text, italics, blockquotes,
 * numbered & bulleted lists into elegant typography styled with
 * Evolve Club's design tokens (Forest Green, Gold, Cream).
 *
 * Also safely detects and highlights Sanskrit verses & transliterations.
 */
export const ArticleContentRenderer = ({ content, className = '' }) => {
  if (!content) return null;

  // Custom components for semantic, accessible, publication-grade styling
  const customComponents = {
    h1: ({ children }) => (
      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950 mt-7 mb-3.5 leading-snug tracking-tight">
        {children}
      </h2>
    ),
    h2: ({ children }) => (
      <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest-950 mt-6 mb-3 leading-snug tracking-tight">
        {children}
      </h3>
    ),
    h3: ({ children }) => (
      <h4 className="font-serif text-lg sm:text-xl font-bold text-forest-950 mt-5 mb-2.5 pb-1 border-b border-gold-500/25 leading-snug">
        {children}
      </h4>
    ),
    h4: ({ children }) => (
      <h5 className="font-serif text-base sm:text-lg font-bold text-gold-700 mt-4 mb-2 leading-snug">
        {children}
      </h5>
    ),
    p: ({ children }) => {
      // Check if the paragraph text contains Devanagari script (Sanskrit verses)
      const rawText = React.Children.toArray(children)
        .map((child) => (typeof child === 'string' ? child : ''))
        .join('');
      const hasDevanagari = /[\u0900-\u097F]/.test(rawText);

      if (hasDevanagari) {
        return (
          <div className="my-5 p-5 rounded-2xl bg-forest-950 text-gold-300 font-serif text-base sm:text-lg italic leading-relaxed border border-gold-500/35 shadow-inner whitespace-pre-line">
            {children}
          </div>
        );
      }

      return (
        <p className="text-sm sm:text-base text-forest-900/90 leading-relaxed my-3.5 font-light">
          {children}
        </p>
      );
    },
    strong: ({ children }) => (
      <strong className="font-semibold text-forest-950">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-forest-900">{children}</em>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-5 p-4 sm:p-5 rounded-2xl bg-cream-100/90 border-l-4 border-gold-500 italic text-forest-950 font-serif text-sm sm:text-base shadow-xs space-y-1 relative">
        <Quote className="w-5 h-5 text-gold-500/40 mb-1" />
        <div className="leading-relaxed">{children}</div>
      </blockquote>
    ),
    ul: ({ children }) => (
      <ul className="my-4 space-y-2 pl-5 list-disc text-sm sm:text-base text-forest-900/90 leading-relaxed marker:text-gold-600">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-4 space-y-2.5 pl-5 list-decimal text-sm sm:text-base text-forest-900/90 leading-relaxed marker:text-gold-600 marker:font-bold">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="pl-1 leading-relaxed text-forest-900/90">{children}</li>
    ),
    hr: () => <hr className="my-6 border-gold-500/20" />
  };

  return (
    <div className={`article-content-body font-sans text-forest-900 ${className}`}>
      <ReactMarkdown components={customComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default ArticleContentRenderer;
