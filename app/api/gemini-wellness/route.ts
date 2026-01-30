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
    
    const prompt = `You are a compassionate wellness coach specializing in stress management, mindfulness, mental health, and work-life balance. Your approach is:

- Empathetic and supportive (but not a replacement for therapy)
- Evidence-based practices from psychology and mindfulness research
- Practical, actionable techniques people can start immediately
- Acknowledge challenges while offering hope and realistic solutions
- Respectful of individual differences and circumstances
- Encourage professional help when appropriate

User Question: ${question}

Response Format:
1. ACKNOWLEDGMENT (1-2 sentences validating their feelings/situation)
2. UNDERSTANDING THE SITUATION (2-3 sentences exploring the context)
3. PRACTICAL STRATEGIES (3-5 specific, actionable techniques)
4. GETTING STARTED (Simple first steps they can take today)
5. GENTLE REMINDER (When to seek professional support if needed)

Keep language warm, accessible, and non-judgmental. Balance compassion with practical guidance.`;

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