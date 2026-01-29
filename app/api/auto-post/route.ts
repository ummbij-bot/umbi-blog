// app/api/auto-post/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Octokit } from 'octokit';

// Vercel Cron 작업 시간 제한(60초) 설정
export const maxDuration = 60; 
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // 1. 보안 체크 (Vercel Cron 또는 관리자만 실행 가능)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Gemini 설정
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 3. 오늘의 주제 선정 (기존 카테고리 중 랜덤 선택)
    const categories = ['finance', 'tech', 'wellness'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    // 날짜 포맷 (예: January 29, 2026)
    const today = new Date().toLocaleDateString('en-US', {
      timeZone: 'America/New_York', // 👈 미국 시간 기준으로 날짜 생성
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const prompt = `
      You are a professional blog writer for a site covering Finance, Tech, and Wellness.
      Write a high-quality, engaging blog post for the category: "${randomCategory}".
      The content should be relevant for 2026, actionable, and SEO-friendly.
      
      Return ONLY a JSON object with this exact structure (no markdown code blocks, just raw JSON):
      {
        "slug": "unique-kebab-case-title-${Date.now()}",
        "title": "Catchy & SEO Optimized Title",
        "excerpt": "A compelling summary (2-3 sentences) for the card preview.",
        "content": "# Title\\n\\n## Introduction\\nHook the reader...\\n\\n## Main Section\\nContent... (Write at least 1000 words in Markdown format using ## for headings)",
        "date": "${today}",
        "category": "${randomCategory}",
        "author": "AI Editor",
        "readTime": "10 min read",
        "image": "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=1000&auto=format&fit=crop"
      }
      
      For the "image" field, choose a high-quality Unsplash URL that perfectly matches the topic (finance, tech, or wellness).
    `;

    // 4. AI 글 생성 요청
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().replace(/```json|```/g, '').trim(); 
    const newPost = JSON.parse(responseText);

    // 5. GitHub 파일 수정 (Octokit 사용)
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    
    // ⚠️ [수정 필요] 본인의 GitHub 아이디와 저장소 이름으로 확인해주세요!
    const owner = 'ummbij-bot'; // 사용자님의 GitHub 아이디
    const repo = 'umbi-blog';   // 저장소 이름
    const path = 'lib/posts.ts';

    // 기존 파일 내용 가져오기
    const { data: fileData } = await octokit.rest.repos.getContent({ owner, repo, path });
    
    // TypeScript 타입 가드 (파일 내용이 있는지 확인)
    if (Array.isArray(fileData) || !('content' in fileData)) {
      throw new Error('File content not found or is a directory');
    }

    const content = Buffer.from(fileData.content, 'base64').toString('utf-8');

    // 6. 새 포스트를 배열에 끼워넣기
    // lib/posts.ts 파일에서 `export const posts: Post[] = [` 배열이 끝나는 `];` 를 찾습니다.
    const insertionPoint = content.lastIndexOf('];');
    
    if (insertionPoint === -1) {
      throw new Error('Could not find insertion point (];) in lib/posts.ts');
    }

    // 기존 배열의 끝(`];`) 바로 앞에 새 포스트 객체 추가
    const newPostString = JSON.stringify(newPost, null, 2);
    const newContent = content.slice(0, insertionPoint) + 
                       `,\n  // Auto-generated post\n  ${newPostString}\n` + 
                       content.slice(insertionPoint);

    // 7. GitHub에 커밋 & 푸시 (자동 배포 트리거됨)
    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: `🤖 Auto-post: ${newPost.title}`,
      content: Buffer.from(newContent).toString('base64'),
      sha: fileData.sha, // 덮어쓰기 방지를 위한 필수 값
    });

    return NextResponse.json({ success: true, title: newPost.title });

  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}