'use client';
import { Project } from 'entities/project';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const MarkdownSection = ({ data }: { data: Project }) => {
  return (
    <div className="prose prose-slate text-custom-gray-100 prose-headings:text-custom-gray-100 prose-strong:text-custom-gray-100 prose-headings:font-bold prose-a:text-white prose-blockquote:text-white prose-blockquote:border-white max-w-none text-xl leading-8 font-semibold">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.body}</ReactMarkdown>
    </div>
  );
};
