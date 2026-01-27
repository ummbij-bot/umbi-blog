'use client';

import { useState } from 'react';
import { FiSend, FiRefreshCw, FiCpu, FiMessageCircle } from 'react-icons/fi';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function TechAIAdvisorPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const exampleQuestions = [
    "What's the best productivity app setup for remote work?",
    "How can I automate my daily tasks to save 2 hours per day?",
    "What cybersecurity measures should I implement for my home office?",
    "Which programming language should I learn for career growth in 2026?",
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
      const res = await fetch('/api/gemini-tech', {
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

  return (
    <div style={{ backgroundColor: 'var(--color-neutral-50)', minHeight: '100vh' }}>
      {/* Header */}
      <section
        className="py-16"
        style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}
      >
        <div className="container-custom">
          <Link href="/tech" className="text-blue-100 hover:text-white mb-4 inline-block">
            ← Back to Tech
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <FiCpu size={40} className="text-white" />
            <h1
              className="text-4xl md:text-5xl font-bold text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              AI Tech Advisor
            </h1>
          </div>
          <p className="text-xl text-white opacity-90">
            Get expert advice on productivity, automation, cybersecurity, and tech tools
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
                      ? 'bg-blue-50 ml-12'
                      : 'bg-white shadow-sm mr-12'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    {message.role === 'assistant' && (
                      <div className="p-2 bg-blue-100 rounded-full">
                        <FiCpu className="text-blue-600" size={20} />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-sm">
                          {message.role === 'user' ? 'You' : 'AI Tech Advisor'}
                        </span>
                        <span className="text-xs text-neutral-500">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      {message.role === 'assistant' ? (
                        <div className="prose prose-sm max-w-none">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-neutral-800">{message.content}</p>
                      )}
                    </div>
                    {message.role === 'user' && (
                      <div className="p-2 bg-blue-600 rounded-full">
                        <FiMessageCircle className="text-white" size={20} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="p-6 rounded-2xl bg-white shadow-sm mr-12">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <FiCpu className="text-blue-600 animate-pulse" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-sm mb-2">AI Tech Advisor</div>
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
                  {messages.length === 0 ? "What's your tech question?" : "Continue the conversation"}
                </span>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={messages.length === 0 
                    ? "Example: What's the best productivity setup for remote developers?"
                    : "Ask a follow-up question..."
                  }
                  className="w-full p-4 border-2 border-neutral-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  rows={messages.length === 0 ? 4 : 2}
                  disabled={loading}
                />
              </label>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <FiRefreshCw className="animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <FiSend />
                      {messages.length === 0 ? 'Get Advice' : 'Send'}
                    </>
                  )}
                </button>
                
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-4 border-2 border-neutral-300 rounded-xl hover:bg-neutral-50 transition-colors font-bold"
                  >
                    New Conversation
                  </button>
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
                    className="text-left p-4 bg-white rounded-xl border-2 border-neutral-200 hover:border-blue-500 transition-colors"
                  >
                    <p className="text-neutral-700">{question}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Related Posts */}
          {messages.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h4 className="font-bold mb-4">Related Articles:</h4>
              <div className="grid gap-4">
                <Link
                  href="/tech/productivity-apps-remote-work-2026"
                  className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                >
                  <p className="font-bold text-blue-900">Best Productivity Apps for 2026</p>
                  <p className="text-sm text-blue-700">Boost your efficiency</p>
                </Link>
                <Link
                  href="/tech/cybersecurity-home-office-guide"
                  className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                >
                  <p className="font-bold text-blue-900">Cybersecurity for Home Office</p>
                  <p className="text-sm text-blue-700">Protect your digital workspace</p>
                </Link>
                <Link
                  href="/tech/automation-tools-save-time-2026"
                  className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                >
                  <p className="font-bold text-blue-900">Automation Tools to Save Time</p>
                  <p className="text-sm text-blue-700">Work smarter, not harder</p>
                </Link>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-8 p-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
            <p className="text-sm text-yellow-900">
              ⚠️ <strong>Disclaimer:</strong> This AI provides general technology advice and recommendations. 
              Always verify information and test solutions in a safe environment before implementing in production.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}