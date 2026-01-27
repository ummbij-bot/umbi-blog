'use client';

import { useState } from 'react';
import { FiSend, FiRefreshCw, FiHeart, FiMessageCircle } from 'react-icons/fi';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function WellnessAICoachPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const exampleQuestions = [
    "I'm feeling overwhelmed with work. How can I manage stress better?",
    "What's a simple meditation routine I can start with 5 minutes a day?",
    "How do I build a sustainable morning routine for better mental health?",
    "I struggle with work-life balance. What strategies can help?",
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
      const res = await fetch('/api/gemini-wellness', {
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
        style={{ background: 'linear-gradient(135deg, #a855f7, #9333ea)' }}
      >
        <div className="container-custom">
          <Link href="/wellness" className="text-purple-100 hover:text-white mb-4 inline-block">
            ← Back to Wellness
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <FiHeart size={40} className="text-white" />
            <h1
              className="text-4xl md:text-5xl font-bold text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              AI Wellness Coach
            </h1>
          </div>
          <p className="text-xl text-white opacity-90">
            Get compassionate guidance on stress management, mindfulness, and mental wellbeing
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
                      ? 'bg-purple-50 ml-12'
                      : 'bg-white shadow-sm mr-12'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    {message.role === 'assistant' && (
                      <div className="p-2 bg-purple-100 rounded-full">
                        <FiHeart className="text-purple-600" size={20} />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-sm">
                          {message.role === 'user' ? 'You' : 'AI Wellness Coach'}
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
                      <div className="p-2 bg-purple-600 rounded-full">
                        <FiMessageCircle className="text-white" size={20} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="p-6 rounded-2xl bg-white shadow-sm mr-12">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 rounded-full">
                      <FiHeart className="text-purple-600 animate-pulse" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-sm mb-2">AI Wellness Coach</div>
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
                  {messages.length === 0 ? "How can I support you today?" : "Continue our conversation"}
                </span>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={messages.length === 0 
                    ? "Share what's on your mind. I'm here to help with stress, mindfulness, and wellbeing..."
                    : "Tell me more..."
                  }
                  className="w-full p-4 border-2 border-neutral-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  rows={messages.length === 0 ? 4 : 2}
                  disabled={loading}
                />
              </label>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <FiRefreshCw className="animate-spin" />
                      Thinking...
                    </>
                  ) : (
                    <>
                      <FiSend />
                      {messages.length === 0 ? 'Get Guidance' : 'Send'}
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
              <h3 className="text-lg font-bold mb-4">Common Topics:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {exampleQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(question)}
                    className="text-left p-4 bg-white rounded-xl border-2 border-neutral-200 hover:border-purple-500 transition-colors"
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
                  href="/wellness/meditation-guide-start-5-minutes"
                  className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
                >
                  <p className="font-bold text-purple-900">Meditation Guide: Start with 5 Minutes</p>
                  <p className="text-sm text-purple-700">Begin your mindfulness journey</p>
                </Link>
                <Link
                  href="/wellness/stress-management-busy-professionals"
                  className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
                >
                  <p className="font-bold text-purple-900">Stress Management for Busy Professionals</p>
                  <p className="text-sm text-purple-700">Practical techniques that work</p>
                </Link>
                <Link
                  href="/wellness/morning-routine-mental-health"
                  className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
                >
                  <p className="font-bold text-purple-900">Morning Routine for Mental Health</p>
                  <p className="text-sm text-purple-700">Start your day mindfully</p>
                </Link>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-8 p-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
            <p className="text-sm text-yellow-900">
              ⚠️ <strong>Important:</strong> This AI provides general wellness guidance and is not a substitute for professional mental health care. 
              If you&apos;re experiencing a crisis or severe mental health symptoms, please contact a licensed mental health professional or call a crisis helpline immediately.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}