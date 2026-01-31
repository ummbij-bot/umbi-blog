import { NextResponse } from 'next/server';
// 1. GenerativeModel 타입 추가 (Type Safety)
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { Octokit } from 'octokit';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

// 🔄 재시도 로직 함수 (타입 수정됨)
async function generateWithRetry(
  model: GenerativeModel, // any 대신 정확한 타입(GenerativeModel) 사용
  prompt: string,
  retries = 3,
  initialDelay = 2000
) {
  for (let i = 0; i < retries; i++) {
    try {
      return await model.generateContent(prompt);
    } catch (error: unknown) { // any 대신 unknown 사용
      // 에러 객체의 타입을 안전하게 추론 (status 속성이 있는지 확인)
      const err = error as { status?: number };

      // 429(Too Many Requests) 또는 503(Service Unavailable) 에러일 때만 재시도
      if ((err.status === 429 || err.status === 503) && i < retries - 1) {
        const delay = initialDelay * Math.pow(2, i);
        console.warn(
          `⚠️ API Quota hit. Retrying in ${delay}ms... (Attempt ${i + 1}/${retries})`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      throw error; // 다른 에러거나 재시도 횟수 초과 시 에러 던짐
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

    // 4. 이미지 자동 생성 (Pollinations AI 활용)
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

    // 6. AI 글쓰기 (재시도 함수 사용)
    const result = await generateWithRetry(model, prompt);
    // result가 undefined일 수 있는 상황 방어 (?.)
    const responseText = result?.response 
      .text()
      .replace(/```json|```/g, '')
      .trim();

    let aiData;
    try {
      if (!responseText) throw new Error('Empty response');
      aiData = JSON.parse(responseText);
    } catch {
      // (수정됨) 사용하지 않는 변수 'e' 제거 -> 그냥 catch {} 만 사용
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
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}