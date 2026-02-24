'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question:
      'How many months of living expenses do most financial experts recommend keeping in an emergency fund?',
    options: [
      '1-2 months',
      '3-6 months',
      '8-10 months',
      '12+ months',
    ],
    correctIndex: 1,
    explanation:
      'Most financial experts, including those at the Consumer Financial Protection Bureau, recommend saving 3 to 6 months of essential living expenses. This provides a sufficient buffer for job loss, medical emergencies, or unexpected repairs without being overly restrictive on your current finances.',
  },
  {
    id: 2,
    question:
      'Compound interest is often called the "eighth wonder of the world." What makes it fundamentally different from simple interest?',
    options: [
      'It uses a higher interest rate than simple interest',
      'It is only available on government-backed bonds',
      'You earn interest on both the principal and previously accumulated interest',
      'It compounds only once per year, while simple interest compounds monthly',
    ],
    correctIndex: 2,
    explanation:
      'Compound interest earns returns on your original principal AND on all previously earned interest. This creates exponential growth over time. For example, $10,000 at 7% simple interest earns $700/year forever, but at 7% compound interest, it grows to over $76,000 in 30 years.',
  },
  {
    id: 3,
    question:
      'Your employer offers a 401(k) match of 50% up to 6% of your salary. You earn $80,000/year. What is the maximum annual "free money" you can receive from this match?',
    options: [
      '$2,400',
      '$4,800',
      '$3,000',
      '$6,000',
    ],
    correctIndex: 0,
    explanation:
      'If you contribute 6% of $80,000, that is $4,800. Your employer matches 50% of that contribution, which equals $2,400. This is essentially a guaranteed 50% return on your contributed amount -- not taking advantage of an employer match is leaving free money on the table.',
  },
  {
    id: 4,
    question:
      'Which of the following has the LARGEST impact on your FICO credit score?',
    options: [
      'Length of credit history (15%)',
      'Credit mix / types of credit (10%)',
      'Payment history (35%)',
      'New credit inquiries (10%)',
    ],
    correctIndex: 2,
    explanation:
      'Payment history accounts for 35% of your FICO score, making it the single most influential factor. This is followed by amounts owed (30%), length of credit history (15%), new credit (10%), and credit mix (10%). Even one late payment can significantly damage your score.',
  },
  {
    id: 5,
    question:
      'Why do most financial advisors recommend index funds over individual stock picking for the average investor?',
    options: [
      'Index funds are guaranteed to never lose money',
      'Individual stocks are not available to retail investors',
      'Index funds provide instant diversification and historically outperform most actively managed funds',
      'Index funds always have higher returns than any individual stock',
    ],
    correctIndex: 2,
    explanation:
      'According to the S&P Indices Versus Active (SPIVA) scorecard, over 90% of actively managed large-cap funds underperformed the S&P 500 over a 20-year period. Index funds offer broad market exposure, lower fees, and diversification, making them ideal for most investors.',
  },
  {
    id: 6,
    question:
      'The Rule of 72 is a quick way to estimate how long it takes to double your money. At a 6% annual return, approximately how many years would it take?',
    options: [
      '6 years',
      '8 years',
      '10 years',
      '12 years',
    ],
    correctIndex: 3,
    explanation:
      'The Rule of 72 states: divide 72 by your annual rate of return to estimate doubling time. At 6%, it takes 72 / 6 = 12 years to double your investment. At 8%, it would take 9 years. This simple formula helps you quickly gauge the power of different return rates.',
  },
  {
    id: 7,
    question:
      'What is the primary tax advantage of a Roth IRA compared to a Traditional IRA?',
    options: [
      'Roth IRA contributions are tax-deductible in the year you make them',
      'Roth IRA has no contribution limits',
      'Qualified withdrawals in retirement are completely tax-free',
      'Roth IRA funds can never be accessed before age 59.5',
    ],
    correctIndex: 2,
    explanation:
      'With a Roth IRA, you contribute after-tax dollars now, but qualified withdrawals in retirement (after age 59.5 and 5 years of account history) are 100% tax-free -- including all investment gains. This is especially powerful if you expect to be in a higher tax bracket in retirement.',
  },
  {
    id: 8,
    question:
      'A well-diversified portfolio should include a mix of asset classes. Which of the following is the BEST example of true diversification?',
    options: [
      'Owning stocks in 10 different tech companies',
      'Splitting investments between domestic stocks, international stocks, bonds, and real estate',
      'Keeping all money in a high-yield savings account',
      'Buying equal amounts of Apple, Microsoft, and Google stock',
    ],
    correctIndex: 1,
    explanation:
      'True diversification means spreading investments across different asset classes (stocks, bonds, real estate) and geographies (domestic, international). Owning 10 tech stocks is sector concentration, not diversification. When one asset class declines, others may hold steady or rise, reducing overall portfolio risk.',
  },
  {
    id: 9,
    question:
      'When paying off multiple debts, the "avalanche method" prioritizes paying off debts based on which factor?',
    options: [
      'Smallest balance first',
      'Largest balance first',
      'Highest interest rate first',
      'Oldest debt first',
    ],
    correctIndex: 2,
    explanation:
      'The debt avalanche method targets the debt with the highest interest rate first while making minimum payments on all others. This minimizes total interest paid over time. The alternative "snowball method" targets the smallest balance first for psychological wins. Mathematically, the avalanche method saves you the most money.',
  },
  {
    id: 10,
    question:
      'If inflation averages 3% per year and your savings account earns 1% interest, what happens to your purchasing power over 10 years?',
    options: [
      'It stays the same because you are still earning interest',
      'It increases slightly due to the interest earned',
      'It decreases because inflation outpaces your interest rate',
      'It doubles thanks to compound growth',
    ],
    correctIndex: 2,
    explanation:
      'When inflation (3%) exceeds your return (1%), you lose approximately 2% of purchasing power each year. Over 10 years, your money loses roughly 18% of its real value. This is why investing for returns that outpace inflation is critical for long-term wealth preservation.',
  },
];

interface LevelInfo {
  label: string;
  emoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
  message: string;
  articles: { title: string; slug: string }[];
}

function getLevelInfo(score: number): LevelInfo {
  if (score <= 3) {
    return {
      label: 'Beginner',
      emoji: '\u{1F331}',
      color: 'text-amber-400',
      bgColor: 'bg-amber-400/10',
      borderColor: 'border-amber-400/30',
      message:
        'You are just starting your financial literacy journey -- and that is great! Everyone starts somewhere. These foundational articles will help you build a strong base.',
      articles: [
        {
          title: 'How to Create a Budget That Actually Works',
          slug: 'create-budget-that-works',
        },
        {
          title: '10 Simple Ways to Save Money Every Month',
          slug: '10-ways-save-money',
        },
        {
          title: 'Emergency Fund Complete Guide',
          slug: 'emergency-fund-complete-guide',
        },
      ],
    };
  }
  if (score <= 6) {
    return {
      label: 'Intermediate',
      emoji: '\u{1F4C8}',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      borderColor: 'border-blue-400/30',
      message:
        'Solid foundation! You understand the basics but there is room to deepen your knowledge. These articles will take your financial skills to the next level.',
      articles: [
        {
          title: 'Investing 101: A Beginner\'s Guide to Growing Your Wealth',
          slug: 'investing-101-beginners-guide',
        },
        {
          title: 'Credit Card Rewards: Maximize Every Dollar You Spend',
          slug: 'credit-card-rewards-guide',
        },
        {
          title: 'Debt-Free Journey: How to Pay Off $50,000',
          slug: 'debt-free-journey-pay-off-50000',
        },
      ],
    };
  }
  if (score <= 9) {
    return {
      label: 'Advanced',
      emoji: '\u{1F680}',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10',
      borderColor: 'border-emerald-400/30',
      message:
        'Impressive knowledge! You have a strong grasp of personal finance concepts. These advanced articles will help you optimize your strategy.',
      articles: [
        {
          title: 'Retirement Planning in Your 30s: The Complete Guide',
          slug: 'retirement-planning-30s-guide',
        },
        {
          title: 'Tax Deductions Everyone Should Know',
          slug: 'tax-deductions-everyone-should-know',
        },
        {
          title: 'FIRE Movement 2026: Financial Independence Guide',
          slug: 'fire-movement-2026-guide',
        },
      ],
    };
  }
  return {
    label: 'Expert',
    emoji: '\u{1F451}',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    borderColor: 'border-yellow-400/30',
    message:
      'Perfect score! You are a personal finance expert. Keep sharpening your edge with these advanced deep-dives.',
    articles: [
      {
        title: 'AI Investing & Robo-Advisors in 2026',
        slug: 'ai-investing-robo-advisors-2026',
      },
      {
        title: 'Inflation-Proof Your Savings in 2026',
        slug: 'inflation-proof-savings-2026',
      },
      {
        title: 'Financial Planning for Major Life Events',
        slug: 'financial-planning-life-events',
      },
    ],
  };
}

export default function FinanceQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );

  const handleSelectAnswer = useCallback(
    (index: number) => {
      if (isAnswered) return;
      setSelectedAnswer(index);
      setIsAnswered(true);
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = index;
      setAnswers(newAnswers);
      if (index === questions[currentQuestion].correctIndex) {
        setScore((prev) => prev + 1);
      }
    },
    [isAnswered, answers, currentQuestion]
  );

  const handleNext = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizComplete(true);
    }
  }, [currentQuestion]);

  const handleRetake = useCallback(() => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizComplete(false);
    setAnswers(Array(questions.length).fill(null));
  }, []);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const q = questions[currentQuestion];

  if (quizComplete) {
    const level = getLevelInfo(score);

    return (
      <div className="w-full max-w-3xl mx-auto">
        {/* Results Card */}
        <div className="bg-stone-800/60 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-8 md:p-12 shadow-2xl">
          {/* Score Circle */}
          <div className="flex flex-col items-center mb-10">
            <div className="text-6xl mb-4">{level.emoji}</div>
            <div className="relative w-36 h-36 mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-stone-700"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="text-emerald-500"
                  strokeDasharray={`${(score / 10) * 326.73} 326.73`}
                  style={{
                    transition: 'stroke-dasharray 1s ease-out',
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white">{score}</span>
                <span className="text-sm text-stone-400">out of 10</span>
              </div>
            </div>
            <div
              className={`inline-block px-5 py-2 rounded-full text-sm font-bold tracking-wider uppercase ${level.bgColor} ${level.color} border ${level.borderColor}`}
            >
              {level.label}
            </div>
          </div>

          {/* Message */}
          <p className="text-stone-300 text-center text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            {level.message}
          </p>

          {/* Recommended Articles */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-white mb-4 text-center">
              Recommended Reading
            </h3>
            <div className="space-y-3">
              {level.articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/finance/${article.slug}`}
                  className="group flex items-center gap-4 bg-stone-700/40 hover:bg-stone-700/70 border border-stone-600/40 hover:border-emerald-500/40 rounded-xl p-4 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors duration-300">
                    <svg
                      className="w-5 h-5 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <span className="text-stone-200 group-hover:text-white font-medium transition-colors duration-300 flex-1">
                    {article.title}
                  </span>
                  <svg
                    className="w-5 h-5 text-stone-500 group-hover:text-emerald-400 transform group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Answer Review */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-white mb-4 text-center">
              Review Your Answers
            </h3>
            <div className="space-y-3">
              {questions.map((question, qIndex) => {
                const userAnswer = answers[qIndex];
                const isCorrect = userAnswer === question.correctIndex;
                return (
                  <div
                    key={question.id}
                    className={`rounded-xl p-4 border ${
                      isCorrect
                        ? 'bg-emerald-500/10 border-emerald-500/30'
                        : 'bg-red-500/10 border-red-500/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                          isCorrect
                            ? 'bg-emerald-500 text-white'
                            : 'bg-red-500 text-white'
                        }`}
                      >
                        {isCorrect ? '\u2713' : '\u2717'}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-stone-300 font-medium mb-1">
                          Q{qIndex + 1}: {question.question}
                        </p>
                        {!isCorrect && userAnswer !== null && (
                          <p className="text-xs text-red-400 mb-1">
                            Your answer: {question.options[userAnswer]}
                          </p>
                        )}
                        <p className="text-xs text-emerald-400">
                          Correct: {question.options[question.correctIndex]}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Retake Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleRetake}
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-[0.98]"
            >
              Retake Quiz
            </button>
            <Link
              href="/finance"
              className="w-full sm:w-auto px-8 py-4 bg-stone-700 hover:bg-stone-600 text-stone-200 font-bold rounded-xl transition-all duration-300 text-center"
            >
              Browse All Articles
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-stone-400">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm font-semibold text-emerald-400">
            {score} correct so far
          </span>
        </div>
        <div className="w-full h-2.5 bg-stone-700/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-stone-800/60 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-6 md:p-10 shadow-2xl">
        {/* Question Number Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/15 border border-emerald-500/30 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">
            Question {currentQuestion + 1}
          </span>
        </div>

        {/* Question Text */}
        <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed mb-8">
          {q.question}
        </h2>

        {/* Answer Options */}
        <div className="space-y-3 mb-8">
          {q.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === q.correctIndex;
            const showCorrect = isAnswered && isCorrect;
            const showWrong = isAnswered && isSelected && !isCorrect;

            let optionClasses =
              'w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-300 flex items-start gap-4 group';

            if (!isAnswered) {
              optionClasses +=
                ' border-stone-600/50 hover:border-emerald-500/60 hover:bg-stone-700/50 cursor-pointer active:scale-[0.99]';
            } else if (showCorrect) {
              optionClasses +=
                ' border-emerald-500 bg-emerald-500/15 cursor-default';
            } else if (showWrong) {
              optionClasses +=
                ' border-red-500 bg-red-500/15 cursor-default';
            } else {
              optionClasses +=
                ' border-stone-700/40 opacity-50 cursor-default';
            }

            const letterLabel = String.fromCharCode(65 + index);

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={isAnswered}
                className={optionClasses}
              >
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    showCorrect
                      ? 'bg-emerald-500 text-white'
                      : showWrong
                        ? 'bg-red-500 text-white'
                        : isAnswered
                          ? 'bg-stone-700 text-stone-500'
                          : 'bg-stone-700/70 text-stone-300 group-hover:bg-emerald-500/30 group-hover:text-emerald-300'
                  }`}
                >
                  {showCorrect ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : showWrong ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    letterLabel
                  )}
                </span>
                <span
                  className={`text-base md:text-lg leading-snug pt-0.5 ${
                    showCorrect
                      ? 'text-emerald-300 font-semibold'
                      : showWrong
                        ? 'text-red-300'
                        : isAnswered
                          ? 'text-stone-500'
                          : 'text-stone-200 group-hover:text-white'
                  }`}
                >
                  {option}
                </span>
              </button>
            );
          })}
        </div>

        {/* Explanation (shown after answering) */}
        {isAnswered && (
          <div className="mb-8 p-5 bg-stone-700/40 border border-stone-600/40 rounded-xl animate-[fadeIn_0.4s_ease-out]">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center mt-0.5">
                <svg
                  className="w-4 h-4 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-2">
                  Explanation
                </h4>
                <p className="text-stone-300 text-sm leading-relaxed">
                  {q.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Next Button */}
        {isAnswered && (
          <div className="flex justify-end animate-[fadeIn_0.3s_ease-out]">
            <button
              onClick={handleNext}
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-[0.98] flex items-center gap-2"
            >
              {currentQuestion < questions.length - 1 ? (
                <>
                  Next Question
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </>
              ) : (
                <>
                  See Results
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
