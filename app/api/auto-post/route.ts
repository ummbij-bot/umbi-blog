// app/api/auto-post/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Octokit } from 'octokit';

export const maxDuration = 60; 
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // 1. 보안 체크
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Gemini 설정
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    // 모델이 가끔 JSON 실수를 하면 1.5 버전이 더 안정적일 때가 있어 1.5로 변경합니다.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 3. 주제 및 날짜 설정 (미국 시간)
    const categories = ['finance', 'tech', 'wellness'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    const today = new Date().toLocaleDateString('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric', month: 'long', day: 'numeric'
    });

    const prompt = `
      You are a professional blog writer. Write a post for category: "${randomCategory}".
      Return ONLY a JSON object. Do not include markdown code blocks like \`\`\`json.
      
      Required Fields:
      - slug: kebab-case-string
      - title: string
      - excerpt: string
      - content: markdown string (at least 1000 words)
      - date: "${today}"
      - category: "${randomCategory}"
      - author: "AI Editor"
      - readTime: "5 min read"
      - image: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=1000&auto=format&fit=crop"
    `;

    // 4. AI 생성
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().replace(/```json|```/g, '').trim(); 
    
    let aiData;
    try {
        aiData = JSON.parse(responseText);
    } catch (e) {
        throw new Error('AI returned invalid JSON');
    }

    // ⭐ [핵심] 안전장치 (Fallback) 추가
    // AI가 빼먹은 항목이 있으면 여기서 강제로 채워넣습니다.
    const safePost = {
        slug: aiData.slug || `post-${Date.now()}`,
        title: aiData.title || "Untitled Post",
        excerpt: aiData.excerpt || "No excerpt available.",
        content: aiData.content || "# No Content\n\nAI failed to generate content.",
        date: aiData.date || today,
        category: aiData.category || randomCategory,
        author: aiData.author || "AI Editor",
        readTime: aiData.readTime || "5 min read",
        image: aiData.image || "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=1000&auto=format&fit=crop"
    };

    // 5. GitHub 저장
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const owner = 'ummbij-bot'; // 본인 아이디 확인
    const repo = 'umbi-blog';
    const path = 'lib/posts.ts';

    const { data: fileData } = await octokit.rest.repos.getContent({ owner, repo, path });
    
    if (Array.isArray(fileData) || !('content' in fileData)) {
      throw new Error('File content not found');
    }

    const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
    const insertionPoint = content.lastIndexOf('];');
    
    if (insertionPoint === -1) throw new Error('Insertion point not found');

    const newPostString = JSON.stringify(safePost, null, 2);
    const newContent = content.slice(0, insertionPoint) + 
                       `,\n  ${newPostString}\n` + 
                       content.slice(insertionPoint);

    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: `🤖 Auto-post: ${safePost.title}`,
      content: Buffer.from(newContent).toString('base64'),
      sha: fileData.sha,
    });

    return NextResponse.json({ success: true, title: safePost.title });

  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}