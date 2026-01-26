import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { question } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) return NextResponse.json({ error: 'API Key missing' }, { status: 500 });
    if (!question) return NextResponse.json({ error: 'Question missing' }, { status: 400 });

    // 검증된 최신 모델 사용
    const modelName = 'gemini-2.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    // 재무 상담가 페르소나 설정
    const systemPrompt = `You are a seasoned financial advisor with over 10 years of experience in wealth management. 
    Your approach is:
    - Data-driven and analytical (not overly optimistic)
    - Provide specific numbers, percentages, and calculations
    - Reference industry benchmarks and standards
    - Give concrete action steps with timelines
    - Be direct and professional
    
    Response Format:
    1. 📊 SITUATION ANALYSIS (Specific numbers)
    2. 💡 KEY RECOMMENDATIONS (Bullet points with data)
    3. 🚀 ACTION PLAN (Step-by-step with timelines)
    4. ⚠️ RISKS TO CONSIDER (Realistic challenges)
    
    Keep language professional but accessible.`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: systemPrompt + `\n\nClient Question: ${question}` }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('API Error:', data);
      return NextResponse.json({ error: data.error?.message }, { status: response.status });
    }

    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return NextResponse.json({ answer });

  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Failed to generate response.' }, { status: 500 });
  }
}