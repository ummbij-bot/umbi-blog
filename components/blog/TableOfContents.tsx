'use client';

import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Extract headings from markdown content
  const headings: TOCItem[] = content
    .split('\n')
    .filter((line) => /^#{2,3}\s/.test(line))
    .map((line) => {
      const level = line.match(/^#+/)?.[0].length || 2;
      const text = line.replace(/^#+\s+/, '').replace(/\*\*/g, '');
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .slice(0, 60);
      return { id, text, level };
    })
    .slice(0, 15); // Max 15 items

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px' }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <>
      {/* Mobile TOC Toggle */}
      <div className="lg:hidden mb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            Table of Contents
          </span>
          <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <nav className="mt-2 p-4 bg-neutral-50 border border-neutral-200 rounded-xl">
            <ul className="space-y-2">
              {headings.map((h) => (
                <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 16}px` }}>
                  <a
                    href={`#${h.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`block text-sm py-1 transition-colors ${
                      activeId === h.id
                        ? 'text-emerald-600 font-semibold'
                        : 'text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop Sticky TOC */}
      <aside className="hidden lg:block fixed right-[max(1rem,calc(50%-640px-280px))] top-24 w-56 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <nav className="p-4 bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-xl shadow-sm">
          <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">On this page</h4>
          <ul className="space-y-1.5">
            {headings.map((h) => (
              <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 12}px` }}>
                <a
                  href={`#${h.id}`}
                  className={`block text-xs py-0.5 transition-all border-l-2 pl-2 ${
                    activeId === h.id
                      ? 'border-emerald-500 text-emerald-700 font-semibold'
                      : 'border-transparent text-neutral-400 hover:text-neutral-700 hover:border-neutral-300'
                  }`}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
