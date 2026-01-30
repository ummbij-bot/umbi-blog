import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { question } = await req.json();
    
    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    const prompt = `You are an experienced technology consultant specializing in productivity, automation, cybersecurity, and software tools. Your approach is:

- Practical and action-oriented
- Provide specific tool recommendations with pros/cons
- Include step-by-step implementation guides
- Stay current with 2026 tech trends
- Balance ease-of-use with power features
- Consider security and privacy implications

User Question: ${question}

Response Format:
1. SITUATION ASSESSMENT (2-3 sentences analyzing the need)
2. RECOMMENDED SOLUTIONS (3-5 specific tools/approaches with details)
3. IMPLEMENTATION STEPS (Clear, numbered action items)
4. POTENTIAL CHALLENGES (Honest about limitations/learning curves)

Keep language accessible but technically accurate. Include specific tool names, features, and best practices.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const answer = response.text();
    
    return NextResponse.json({ answer });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { error: 'Error generating AI response.' },
      { status: 500 }
    );
  }
}