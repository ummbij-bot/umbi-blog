const disclaimers: Record<string, string> = {
  finance:
    'Disclaimer: This article is for educational purposes only and does not constitute financial advice. Consult a qualified financial advisor before making investment or financial decisions.',
  tech:
    'Disclaimer: Product recommendations are based on independent research and testing. We may earn a commission through affiliate links at no extra cost to you.',
  wellness:
    'Disclaimer: This content is for informational purposes only and is not a substitute for professional medical advice. Always consult your healthcare provider before starting any new health regimen.',
};

interface ContentDisclaimerProps {
  category: string;
  date: string;
  readTime: string;
  wordCount: number;
}

export default function ContentDisclaimer({ category, date, readTime, wordCount }: ContentDisclaimerProps) {
  const disclaimer = disclaimers[category] || '';

  return (
    <div className="mb-8 space-y-3">
      {/* Article Meta */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500">
        <time dateTime={new Date(date).toISOString().split('T')[0]}>
          Published: {date}
        </time>
        <span className="hidden sm:inline">|</span>
        <span>{readTime}</span>
        <span className="hidden sm:inline">|</span>
        <span>{wordCount.toLocaleString()} words</span>
      </div>

      {/* Disclaimer */}
      {disclaimer && (
        <div className="px-4 py-3 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <p className="text-xs text-amber-800 leading-relaxed">{disclaimer}</p>
        </div>
      )}
    </div>
  );
}
