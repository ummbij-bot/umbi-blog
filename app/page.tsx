import { Suspense } from 'react';
import HomeClient from '@/components/HomeClient';
import { getAllPosts } from '@/lib/posts'; // 1. 전체 글을 가져오는 함수를 불러옵니다.

export default async function Home() {
  // 2. Supabase 대신 로컬 함수를 사용합니다.
  // lib/posts.ts에 getAllPosts라는 함수가 있는지 확인해 보세요.
  const posts = getAllPosts(); 

  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <HomeClient initialPosts={posts} />
    </Suspense>
  );
}