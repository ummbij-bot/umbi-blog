import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { posts } from '@/lib/posts';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { question } = await req.json();
    
    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    // Finance 포스트 리스트 준비
    const financePosts = posts
      .filter(p => p.category === 'finance')
      .map(p => `- ${p.title} (slug: ${p.slug})`)
      .join('\n');
    
    const prompt = `You are a seasoned financial advisor with over 10 years of experience in wealth management. Your approach is:

- Data-driven and analytical (not overly optimistic)
- Provide specific numbers, percentages, and calculations
- Reference industry benchmarks and standards
- Give concrete action steps with timelines
- Be direct and professional, not sugar-coating financial realities
- Include risk assessment when relevant

Client Question: ${question}

Response Format:
1. SITUATION ANALYSIS (2-3 sentences with specific numbers)
2. KEY RECOMMENDATIONS (3-5 bullet points with concrete data)
3. ACTION PLAN (Step-by-step with timelines)
4. RISKS TO CONSIDER (Be realistic about challenges)

Keep language professional but accessible. Use specific percentages, dollar amounts, and timeframes.

---

IMPORTANT: After your answer, recommend 3 related blog posts from this list:
${financePosts}

Format your recommendation as:
RELATED_POSTS: slug1, slug2, slug3

Choose posts that are most relevant to the user's question.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const fullAnswer = response.text();
    
    // AI 답변에서 포스트 추천 분리
    const relatedPostsMatch = fullAnswer.match(/RELATED_POSTS:\s*(.+)/);
    let answer = fullAnswer;
    let relatedPosts: string[] = [];
    
    if (relatedPostsMatch) {
      // AI가 추천한 포스트 slug 추출
      answer = fullAnswer.replace(/RELATED_POSTS:.+/, '').trim();
      relatedPosts = relatedPostsMatch[1]
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .slice(0, 3);
    } else {
      // AI가 추천하지 않은 경우 기본 포스트
      relatedPosts = [
        'retirement-planning-30s-guide',
        'investing-101-beginners-guide',
        'debt-free-journey-pay-off-50000'
      ];
    }
    
    return NextResponse.json({ answer, relatedPosts });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { error: 'Error generating AI response.' },
      { status: 500 }
    );
  }
}
