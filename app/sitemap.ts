import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://umbi-blog.vercel.app'

  // 1. 고정 페이지 (메뉴 등)
  const routes = [
    '',
    '/finance',
    '/tech',
    '/wellness',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/finance/tools/calculator',
    '/wellness/tools/bmi-calculator',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.9,
  }))

  // 2. 블로그 글 목록 (아까 주신 목록 반영)
  const posts = [
    'finance/10-ways-save-money',
    'finance/investing-101-beginners-guide',
    'finance/create-budget-that-works',
    'finance/emergency-fund-complete-guide',
    'finance/credit-card-rewards-guide',
    'finance/side-hustles-extra-money-2026',
    'finance/retirement-planning-30s-guide',
    'finance/tax-deductions-everyone-should-know',
    'finance/real-estate-investing-beginners',
    'finance/financial-planning-life-events',
    'finance/debt-free-journey-pay-off-50000',
    'finance/smart-shopping-save-money-without-coupons',
    'tech/top-10-ai-tools-2026',
    'tech/ultimate-remote-work-setup',
    'tech/master-productivity-apps',
    'tech/cybersecurity-basics-protect-yourself-online',
    'tech/cloud-storage-comparison-2026',
    'tech/building-first-website-beginners-guide',
    'tech/best-free-software-content-creators-2026',
    'wellness/7-day-meal-prep-guide',
    'wellness/15-minute-morning-workout',
    'wellness/science-of-better-sleep',
    'wellness/meditation-guide-start-5-minutes',
    'wellness/stress-management-techniques-that-work',
  ].map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...routes, ...posts]
}