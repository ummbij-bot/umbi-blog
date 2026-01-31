export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import HomeClient from '@/components/HomeClient';
import { supabase } from '@/lib/supabase';

// 서버에서 데이터 가져오기
async function getPosts() {
  // 🚨 [중요] 빌드 시점에 supabase가 null일 경우를 대비한 안전장치입니다.
  if (!supabase) {
    console.warn('Supabase 환경 변수가 없습니다. 빈 배열을 반환합니다.');
    return [];
    async function getPosts() {
  if (!supabase) return [];
  
  const { data, error } = await supabase.from('posts').select('*');
  
  // 배포 후 Vercel Logs에서 이 숫자가 0인지 확인해 보세요!
  console.log('가져온 포스트 개수:', data?.length); 
  
  if (error) console.error('에러 발생:', error.message);
  return data || [];
}
  }

  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      return [];
    }

    return data || [];
  } catch (e) {
    console.error('Supabase 호출 중 오류 발생:', e);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      {/* 원래의 UI를 담당하는 HomeClient를 다시 불러옵니다! */}
      <HomeClient initialPosts={posts} />
    </Suspense>
  );
} // 마지막에 빠졌던 중괄호를 닫았습니다.