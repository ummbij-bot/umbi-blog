import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// 💡 환경 변수가 없을 때를 대비해 기본값(빈 문자열)을 설정하여 라이브러리 에러를 방지합니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// ✅ URL과 Key가 둘 다 있을 때만 클라이언트를 생성합니다.
// 이렇게 하면 환경 변수가 없어도 빌드 도중 'Error'가 발생하지 않습니다.
const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export async function GET() {
  if (!supabase) {
    return NextResponse.json(
      { error: 'Supabase is not configured' },
      { status: 500 },
    );
  }

  try {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
