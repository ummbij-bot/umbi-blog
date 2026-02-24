import Link from 'next/link';

interface AuthorBoxProps {
  author: string;
  date: string;
}

export default function AuthorBox({ author, date }: AuthorBoxProps) {
  return (
    <div className="mt-12 p-6 bg-neutral-50 rounded-2xl border border-neutral-200">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
          U
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-bold text-neutral-900">{author}</h4>
            <span className="text-xs px-2 py-0.5 bg-neutral-200 text-neutral-600 rounded-full">Independent Blogger</span>
          </div>
          <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
            I research and write about personal finance, technology, and wellness &mdash; topics
            I&apos;m genuinely passionate about. Every article is thoroughly researched and based
            on real-world experience. Not a certified professional; always consult experts
            for major financial or health decisions.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {['Research-Backed', 'Personally Tested', 'No Sponsorships'].map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 bg-white border border-neutral-200 rounded-md text-neutral-500">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-neutral-400">
            <span>Published: {date}</span>
            <span>|</span>
            <Link href="/about" className="hover:text-neutral-600 transition-colors underline">
              About This Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
