export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: 'finance' | 'tech' | 'wellness';
  author: string;
  readTime: string;
  image?: string;
}

export const posts: Post[] = [
  // Finance Posts
  {
    slug: '10-ways-save-money',
    title: '10 Simple Ways to Save Money Every Month',
    excerpt: 'Discover practical strategies to cut expenses and boost your savings without sacrificing your lifestyle.',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000&auto=format&fit=crop', // 돈/저축 (안정적)
    content: `
# 10 Simple Ways to Save Money Every Month

Saving money doesn't have to mean completely overhauling your lifestyle. With these ten practical strategies, you can start building your savings while still enjoying life.

## 1. Track Your Spending
The first step to saving money is understanding where it goes. Use budgeting apps like Mint or YNAB.

## 2. Automate Your Savings
Set up automatic transfers from your checking to your savings account on payday.

## Conclusion
Implementing even half of these strategies can lead to significant monthly savings.
    `,
    date: 'January 20, 2026',
    category: 'finance',
    author: 'Sarah Johnson',
    readTime: '5 min read',
  },
  {
    slug: 'investing-101-beginners-guide',
    title: 'Investing 101: A Beginner\'s Guide to the Stock Market',
    excerpt: 'Learn the fundamentals of stock market investing and how to build a diversified portfolio.',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1000&auto=format&fit=crop', // 주식 차트 (교체됨)
    content: `
# Investing 101: A Beginner's Guide to the Stock Market

Starting your investment journey can feel overwhelming, but understanding the basics of stock market investing is simpler than you think.

## Understanding the Stock Market
The stock market is where shares of publicly-traded companies are bought and sold.

## Conclusion
Stock market investing isn't about getting rich quickly—it's about building wealth steadily over time.
    `,
    date: 'January 18, 2026',
    category: 'finance',
    author: 'Michael Chen',
    readTime: '8 min read',
  },
  {
    slug: 'create-budget-that-works',
    title: 'How to Create a Budget That Actually Works',
    excerpt: 'Master the art of budgeting with these proven techniques that help you take control of your finances.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop', // 계산기 (안정적)
    content: `
# How to Create a Budget That Actually Works

Creating a budget is one thing. Sticking to it is another.

## The 50/30/20 Rule
This popular budgeting framework divides your after-tax income into Needs, Wants, and Savings.

## Conclusion
A successful budget isn't about perfection—it's about progress.
    `,
    date: 'January 15, 2026',
    category: 'finance',
    author: 'Emily Rodriguez',
    readTime: '10 min read',
  },
  {
    slug: 'emergency-fund-complete-guide',
    title: 'Building Your Emergency Fund: A Complete Guide',
    excerpt: 'Learn how to build a financial safety net that protects you from unexpected expenses and provides peace of mind.',
    // 👇 [수정됨] 확실하게 작동하는 새 이미지 (저금통)
    image: 'https://images.unsplash.com/photo-1534951009808-766178b47a8e?q=80&w=1000&auto=format&fit=crop',
    content: `
# Building Your Emergency Fund: A Complete Guide

An emergency fund is your financial safety net—the buffer between you and life's unexpected expenses.

## What Is an Emergency Fund?
Money set aside specifically for unexpected expenses like job loss or medical emergencies.

## Conclusion
Building an emergency fund requires patience, but it provides priceless peace of mind.
    `,
    date: 'January 12, 2026',
    category: 'finance',
    author: 'David Martinez',
    readTime: '12 min read',
  },

  // Tech Posts
  {
    slug: 'top-10-ai-tools-2026',
    title: 'Top 10 AI Tools to Boost Your Productivity in 2026',
    excerpt: 'Explore the most powerful AI tools that can revolutionize your workflow and save hours every week.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop', // AI 뇌 (안정적)
    content: `
# Top 10 AI Tools to Boost Your Productivity in 2026

Artificial intelligence has moved from science fiction to everyday reality.

## 1. ChatGPT Plus
Your AI writing assistant for drafting emails and code.

## Conclusion
The future of productivity is here, and it's powered by AI.
    `,
    date: 'January 22, 2026',
    category: 'tech',
    author: 'Alex Thompson',
    readTime: '12 min read',
  },
  {
    slug: 'ultimate-remote-work-setup',
    title: 'The Ultimate Remote Work Setup Guide',
    excerpt: 'Create the perfect home office with our comprehensive guide to hardware, software, and ergonomics.',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop', // 오피스 (안정적)
    content: `
# The Ultimate Remote Work Setup Guide

Working from home effectively requires more than just a laptop and WiFi.

## The Foundation: Your Workspace
Choose a location with natural light and minimal traffic.

## Conclusion
Invest in your setup, invest in yourself.
    `,
    date: 'January 19, 2026',
    category: 'tech',
    author: 'Jessica Park',
    readTime: '15 min read',
  },
  {
    slug: 'master-productivity-apps',
    title: 'Master These 5 Productivity Apps for Maximum Efficiency',
    excerpt: 'Discover the essential apps that top performers use to stay organized and accomplish more.',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1000&auto=format&fit=crop', // 앱/계획 (안정적)
    content: `
# Master These 5 Productivity Apps for Maximum Efficiency

The right productivity apps can transform your workflow.

## 1. Notion
Your second brain for notes and projects.

## Conclusion
Tools amplify good systems but can't fix bad habits.
    `,
    date: 'January 16, 2026',
    category: 'tech',
    author: 'Ryan Kim',
    readTime: '14 min read',
  },

  // Wellness Posts
  {
    slug: '7-day-meal-prep-guide',
    title: '7-Day Meal Prep Guide for Busy Professionals',
    excerpt: 'Simplify your week with healthy, delicious meals that you can prepare in advance.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop', // 건강식 (안정적)
    content: `
# 7-Day Meal Prep Guide for Busy Professionals

Meal prepping saves time, money, and helps you eat healthier.

## Why Meal Prep Works
Saves time, money, and reduces stress.

## Conclusion
Meal prep is about taking control of your nutrition.
    `,
    date: 'January 23, 2026',
    category: 'wellness',
    author: 'Maria Garcia',
    readTime: '15 min read',
  },
  {
    slug: '15-minute-morning-workout',
    title: '15-Minute Morning Workout Routine for Beginners',
    excerpt: 'Start your day right with this simple yet effective workout routine that requires no equipment.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop', // 운동 (안정적)
    content: `
# 15-Minute Morning Workout Routine for Beginners

Transform your mornings with this equipment-free workout.

## The Routine
Squats, Push-ups, Lunges, Plank.

## Conclusion
Consistency is key.
    `,
    date: 'January 21, 2026',
    category: 'wellness',
    author: 'James Wilson',
    readTime: '14 min read',
  },
  {
    slug: 'science-of-better-sleep',
    title: 'The Science of Better Sleep: 10 Evidence-Based Tips',
    excerpt: 'Improve your sleep quality with scientifically proven strategies for deeper, more restorative rest.',
    // 👇 [수정됨] 확실하게 작동하는 새 이미지 (침실)
    image: 'https://images.unsplash.com/photo-1520206183501-b80df61043c2?q=80&w=1000&auto=format&fit=crop', 
    content: `
# The Science of Better Sleep: 10 Evidence-Based Tips

Quality sleep is the foundation of health.

## 1. Master Your Sleep Schedule
Consistency strengthens your circadian rhythm.

## Conclusion
Sleep well, live better.
    `,
    date: 'January 17, 2026',
    category: 'wellness',
    author: 'Dr. Rachel Kim',
    readTime: '18 min read',
  },
];

export function getPostBySlug(category: string, slug: string): Post | undefined {
  return posts.find(post => post.category === category && post.slug === slug);
}

export function getPostsByCategory(category: string): Post[] {
  return posts.filter(post => post.category === category);
}