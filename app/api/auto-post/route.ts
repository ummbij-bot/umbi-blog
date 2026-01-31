import { NextResponse } from 'next/server';
// 1. GenerativeModel 타입을 명시적으로 가져옵니다.
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { Octokit } from 'octokit';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

// 🔄 재시도 로직 함수
async function generateWithRetry(
  model: GenerativeModel, // ✅ any 대신 정확한 타입을 지정했습니다.
  prompt: string,
  retries = 3,
  initialDelay = 2000,
) {
  for (let i = 0; i < retries; i++) {
    try {
      return await model.generateContent(prompt);
    } catch (error: unknown) {
      // ✅ any 대신 unknown을 사용합니다.
      // 에러 객체의 타입을 안전하게 확인합니다.
      const err = error as { status?: number; message?: string };

      const isQuotaError =
        err.status === 429 ||
        err.status === 503 ||
        err.message?.includes('429') ||
        err.message?.includes('Quota');

      if (isQuotaError && i < retries - 1) {
        const delay = initialDelay * Math.pow(2, i);
        console.warn(`⚠️ API Quota hit. Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
}

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const categories = ['finance', 'tech', 'wellness'];
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];

    const today = new Date().toLocaleDateString('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const randomSeed = Math.floor(Math.random() * 10000);
    const dynamicImageUrl = `https://image.pollinations.ai/prompt/${randomCategory}%20minimalist%20concept%20art?width=1200&height=630&nologo=true&seed=${randomSeed}`;

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
      // ✅ 사용하지 않는 변수 'e'를 제거했습니다.
      throw new Error('AI returned invalid JSON');
    }

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

    const fileContent = Buffer.from(fileData.content, 'base64').toString(
      'utf-8',
    );
    const insertionPoint = fileContent.lastIndexOf('];');

    if (insertionPoint === -1) throw new Error('Insertion point not found');

    const newPostString = JSON.stringify(safePost, null, 2);
    const newContent =
      fileContent.slice(0, insertionPoint).trimEnd().replace(/,$/, '') +
      `,\n  ${newPostString}\n` +
      fileContent.slice(insertionPoint);

    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: `🤖 Auto-post: ${safePost.title}`,
      content: Buffer.from(newContent).toString('base64'),
      sha: fileData.sha,
    });

    return NextResponse.json({ success: true, title: safePost.title });
  } catch (error: unknown) {
    // ✅ 마지막 catch 블록도 unknown으로 수정했습니다.
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
