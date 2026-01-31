import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Octokit } from 'octokit';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

// 🔄 재시도 로직 함수 (Linter Free 버전)
async function generateWithRetry(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: any, // 라이브러리 호환성을 위해 이곳만 예외 처리
  prompt: string,
  retries = 3,
  initialDelay = 2000
) {
  for (let i = 0; i < retries; i++) {
    try {
      return await model.generateContent(prompt);
    } catch (error: unknown) { // ✅ 수정됨: any -> unknown
      // 에러 객체를 안전한 타입으로 변환하여 속성 접근
      const err = error as { status?: number; message?: string };

      // 에러 메시지나 상태 코드를 통해 Quota 초과 확인
      const isQuotaError =
        err.status === 429 ||
        err.status === 503 ||
        err.message?.includes('429') ||
        err.message?.includes('Quota') ||
        err.message?.includes('Too Many Requests');

      if (isQuotaError && i < retries - 1) {
        const delay = initialDelay * Math.pow(2, i);
        console.warn(
          `⚠️ API Quota hit. Retrying in ${delay}ms... (Attempt ${i + 1}/${retries})`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
}

export async function GET(request: Request) {
  try {
    // 1. 보안 체크
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Gemini 설정
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // 3. 주제 및 날짜 설정
    const categories = ['finance', 'tech', 'wellness'];
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];

    const today = new Date().toLocaleDateString('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // 4. 이미지 자동 생성
    const randomSeed = Math.floor(Math.random() * 10000);
    const dynamicImageUrl = `https://image.pollinations.ai/prompt/${randomCategory}%20minimalist%20concept%20art?width=1200&height=630&nologo=true&seed=${randomSeed}`;

    // 5. 프롬프트 설정
    const prompt = `
      You are a professional blog writer. Write a post for category: "${randomCategory}".
      Return ONLY a JSON object. Do not include markdown code blocks.
      
      Required Fields:
      - slug: kebab-case-string
      - title: string
      - excerpt: string
      - content: markdown string (at least 1000 words)
      - date: "${today}"
      - category: "${randomCategory}"
      - author: "AI Editor"
      - readTime: "5 min read"
    `;

    // 6. AI 글쓰기
    const result = await generateWithRetry(model, prompt);
    const responseText = result?.response
      .text()
      .replace(/```json|```/g, '')
      .trim();

    let aiData;
    try {
      if (!responseText) throw new Error('Empty response');
      aiData = JSON.parse(responseText);
    } catch {
      throw new Error('AI returned invalid JSON');
    }

    // 7. 안전장치 (Fallback)
    const safePost = {
      slug: aiData.slug || `post-${Date.now()}`,
      title: aiData.title || 'Untitled Post',
      excerpt: aiData.excerpt || 'No excerpt available.',
      content:
        aiData.content || '# No Content\n\nAI failed to generate content.',
      date: aiData.date || today,
      category: aiData.category || randomCategory,
      author: aiData.author || 'AI Editor',
      readTime: aiData.readTime || '5 min read',
      image: dynamicImageUrl,
    };

    // 8. GitHub 저장
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const owner = 'ummbij-bot';
    const repo = 'umbi-blog';
    const path = 'lib/posts.ts';

    const { data: fileData } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
    });

    if (Array.isArray(fileData) || !('content' in fileData)) {
      throw new Error('File content not found');
    }

    const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
    const insertionPoint = content.lastIndexOf('];');

    if (insertionPoint === -1) throw new Error('Insertion point not found');

    const newPostString = JSON.stringify(safePost, null, 2);
    const newContent =
      content.slice(0, insertionPoint).trimEnd().replace(/,$/, '') +
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

    return NextResponse.json({
      success: true,
      title: safePost.title,
      image: safePost.image,
    });
  } catch (error: unknown) { // ✅ 수정됨: any -> unknown
    console.error(error);
    // ✅ 수정됨: 에러 메시지 안전 추출
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}