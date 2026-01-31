import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 에러를 던지는 대신 콘솔 로그만 찍도록 수정
if (!supabaseUrl || !supabaseKey) {
  console.warn('주의: Supabase 환경 변수가 없습니다. API 호출이 실패할 수 있습니다.');
}

// 기존 코드를 이렇게 조금 더 안전하게 바꿔보세요.
export const supabase = (typeof window !== 'undefined' || (supabaseUrl && supabaseKey)) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;
export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  author: string;
  read_time: string;
  views: number;
  likes: number;
  created_at?: string;
  updated_at?: string;
}
