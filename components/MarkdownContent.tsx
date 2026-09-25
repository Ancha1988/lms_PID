'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="markdown-content text-sm sm:text-base text-slate-200 leading-relaxed space-y-3 font-normal">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-xl sm:text-2xl font-black text-white mt-5 mb-3 border-b border-slate-700/60 pb-2">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg sm:text-xl font-extrabold text-sky-200 mt-5 mb-2.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
              <span>{children}</span>
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base sm:text-lg font-bold text-amber-300 mt-4 mb-2 flex items-center gap-2">
              <span>{children}</span>
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-slate-300 leading-relaxed mb-3">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-extrabold text-amber-300 bg-amber-500/15 px-1.5 py-0.5 rounded border border-amber-500/30">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="text-sky-300 not-italic font-medium underline decoration-sky-500/40 underline-offset-2">
              {children}
            </em>
          ),
          ul: ({ children }) => (
            <ul className="space-y-2 my-3 pl-1">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="space-y-2 my-3 pl-1 list-decimal list-inside">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="flex items-start gap-2.5 text-slate-300 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 flex-shrink-0" />
              <span className="flex-1">{children}</span>
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-amber-400 bg-amber-500/10 p-4 rounded-r-2xl my-4 text-amber-100 italic shadow-inner">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-sky-300 font-mono text-xs">
              {children}
            </code>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-4 rounded-xl border border-slate-700 bg-slate-950/60 shadow-lg">
              <table className="w-full border-collapse text-xs sm:text-sm text-left">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#1C2541] text-amber-300 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-700">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="p-3 border-r border-slate-700/60 last:border-r-0">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="p-3 border-t border-slate-800 border-r border-slate-800/60 last:border-r-0 text-slate-300">
              {children}
            </td>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-slate-900/60 transition">
              {children}
            </tr>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
