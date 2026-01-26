'use client';

import { useState } from 'react';
import { FiSend, FiRefreshCw, FiTrendingUp } from 'react-icons/fi';
import Link from 'next/link';

export default function AIAdvisorPage() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const exampleQuestions = [
    "I make $150k/year. How much should I save for retirement?",
    "What's the most efficient way to pay off $50k in credit card debt at 18% APR?",
    "I'm 35 with $200k saved. Am I on track to retire at 65?",
    "Should I invest in index funds or target-date funds with a 25-year horizon?",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    setLoading(true);
    setResponse('');
    
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),
      });
      
      const data = await res.json();
      
      if (data.error) {
        setResponse('Sorry, there was an error generating a response. Please try again.');
      } else {
        setResponse(data.answer);
      }
    } catch {
      setResponse('Network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (question: string) => {
    setInput(question);
  };

  const handleReset = () => {
    setInput('');
    setResponse('');
  };

  return (
    <div style={{ backgroundColor: 'var(--color-neutral-50)', minHeight: '100vh' }}>
      {/* Header */}
      <section
        className="py-16"
        style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
      >
        <div className="container-custom">
          <Link href="/finance" className="text-emerald-100 hover:text-white mb-4 inline-block">
            ← Back to Finance
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <FiTrendingUp size={40} className="text-white" />
            <h1
              className="text-4xl md:text-5xl font-bold text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              AI Financial Advisor
            </h1>
          </div>
          <p className="text-xl text-white opacity-90">
            Get data-driven financial advice from an AI with 10+ years of wealth management experience
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom max-w-4xl">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <form onSubmit={handleSubmit}>
              <label className="block mb-4">
                <span className="text-lg font-bold text-neutral-900 mb-2 block">
                  What&apos;s your financial question?
                </span>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Example: I make $150k/year and have $300k in retirement savings. Am I on track for retirement at 65?"
                  className="w-full p-4 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                  rows={4}
                  disabled={loading}
                />
              </label>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <FiRefreshCw className="animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <FiSend />
                      Get Analysis
                    </>
                  )}
                </button>
                
                {response && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-4 border-2 border-neutral-300 rounded-xl hover:bg-neutral-50 transition-colors font-bold"
                  >
                    New Question
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Example Questions */}
          {!response && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4">Example Questions:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {exampleQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(question)}
                    className="text-left p-4 bg-white rounded-xl border-2 border-neutral-200 hover:border-emerald-500 transition-colors"
                  >
                    <p className="text-neutral-700">{question}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Response Section */}
          {response && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-100 rounded-full">
                  <FiTrendingUp className="text-emerald-600" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-emerald-600">
                  Financial Analysis
                </h3>
              </div>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-neutral-800 leading-relaxed">
                  {response}
                </div>
              </div>

              {/* Related Posts */}
              <div className="mt-8 pt-8 border-t border-neutral-200">
                <h4 className="font-bold mb-4">Related Articles:</h4>
                <div className="grid gap-4">
                  <Link
                    href="/finance/retirement-planning-30s-guide"
                    className="p-4 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors"
                  >
                    <p className="font-bold text-emerald-900">Retirement Planning in Your 30s</p>
                    <p className="text-sm text-emerald-700">Comprehensive retirement strategy guide</p>
                  </Link>
                  <Link
                    href="/finance/investing-101-beginners-guide"
                    className="p-4 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors"
                  >
                    <p className="font-bold text-emerald-900">Investing 101: Beginner&apos;s Guide</p>
                    <p className="text-sm text-emerald-700">Start your investment journey</p>
                  </Link>
                  <Link
                    href="/finance/debt-free-journey-pay-off-50000"
                    className="p-4 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors"
                  >
                    <p className="font-bold text-emerald-900">Debt-Free Journey</p>
                    <p className="text-sm text-emerald-700">How I paid off $50k in debt</p>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-8 p-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
            <p className="text-sm text-yellow-900">
              ⚠️ <strong>Disclaimer:</strong> This AI provides general financial information and analysis 
              based on common wealth management principles. It is not personalized financial advice. 
              Always consult with a licensed financial advisor before making significant financial decisions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}