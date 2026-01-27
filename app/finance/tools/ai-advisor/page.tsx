'use client';

import { useState } from 'react';
import { FiSend, FiRefreshCw, FiTrendingUp, FiMessageCircle, FiCopy, FiDownload } from 'react-icons/fi';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { posts } from '@/lib/posts';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  relatedPosts?: string[];  
}

export default function AIAdvisorPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
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
    
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setInput('');
    
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question: input,
          history: messages,
        }),
      });
      
      const data = await res.json();
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.error || data.answer,
        timestamp: new Date(),
         relatedPosts: data.relatedPosts || [],
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Network error occurred. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (question: string) => {
    setInput(question);
  };

  const handleReset = () => {
    setMessages([]);
    setInput('');
  };

  const handleCopyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    alert('Copied to clipboard!');
  };

  const handleDownload = () => {
    const allMessages = messages
      .map(m => `${m.role === 'user' ? 'You' : 'AI Financial Advisor'} (${m.timestamp.toLocaleTimeString()}):\n${m.content}\n`)
      .join('\n---\n\n');
    
    const blob = new Blob([allMessages], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financial-advice-${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
          
          {/* Conversation History */}
          {messages.length > 0 && (
            <div className="mb-8 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-emerald-50 ml-12'
                      : 'bg-white shadow-sm mr-12'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    {message.role === 'assistant' && (
                      <div className="p-2 bg-emerald-100 rounded-full">
                        <FiTrendingUp className="text-emerald-600" size={20} />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-sm">
                          {message.role === 'user' ? 'You' : 'AI Financial Advisor'}
                        </span>
                        <span className="text-xs text-neutral-500">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      {message.role === 'assistant' ? (
                        <>
                          <div className="prose prose-sm max-w-none">
                            <ReactMarkdown>{message.content}</ReactMarkdown>
                          </div>
                          {/* Share buttons */}
                          <div className="flex gap-2 mt-4 pt-4 border-t border-neutral-200">
                            <button
                              onClick={() => handleCopyToClipboard(message.content)}
                              className="flex items-center gap-2 px-3 py-2 text-sm bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                              title="Copy to clipboard"
                            >
                              <FiCopy size={16} />
                              Copy
                            </button>
                          </div>
                        </>
                      ) : (
                        <p className="text-neutral-800">{message.content}</p>
                      )}
                    </div>
                    {message.role === 'user' && (
                      <div className="p-2 bg-emerald-600 rounded-full">
                        <FiMessageCircle className="text-white" size={20} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="p-6 rounded-2xl bg-white shadow-sm mr-12">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-100 rounded-full">
                      <FiTrendingUp className="text-emerald-600 animate-pulse" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-sm mb-2">AI Financial Advisor</div>
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <form onSubmit={handleSubmit}>
              <label className="block mb-4">
                <span className="text-lg font-bold text-neutral-900 mb-2 block">
                  {messages.length === 0 ? "What's your financial question?" : "Continue the conversation"}
                </span>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={messages.length === 0 
                    ? "Example: I make $150k/year and have $300k in retirement savings. Am I on track for retirement at 65?"
                    : "Ask a follow-up question..."
                  }
                  className="w-full p-4 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                  rows={messages.length === 0 ? 4 : 2}
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
                      {messages.length === 0 ? 'Get Analysis' : 'Send'}
                    </>
                  )}
                </button>
                
                {messages.length > 0 && (
                  <>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-4 border-2 border-neutral-300 rounded-xl hover:bg-neutral-50 transition-colors font-bold"
                    >
                      New Chat
                    </button>
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors"
                      title="Download conversation"
                    >
                      <FiDownload size={18} />
                      Download
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>

          {/* Example Questions */}
          {messages.length === 0 && (
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

          {/* Related Posts */}
         {/* Related Posts - Dynamic based on AI recommendation */}
{messages.length > 0 && messages[messages.length - 1].relatedPosts && messages[messages.length - 1].relatedPosts!.length > 0 && (
  <div className="bg-white rounded-2xl shadow-lg p-8">
    <h4 className="font-bold mb-4">Related Articles:</h4>
    <div className="grid gap-4">
      {messages[messages.length - 1].relatedPosts!.map((slug, index) => {
        const post = posts.find(p => p.slug === slug && p.category === 'finance');
        if (!post) return null;
        
        return (
          <Link
            key={index}
            href={`/finance/${slug}`}
            className="p-4 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors"
          >
            <p className="font-bold text-emerald-900">{post.title}</p>
            <p className="text-sm text-emerald-700">{post.excerpt}</p>
          </Link>
        );
      })}
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