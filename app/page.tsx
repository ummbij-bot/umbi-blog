import { Suspense } from 'react';
import HomeClient from '@/components/HomeClient';
import { supabase } from '@/lib/supabase';

// 서버에서 데이터 가져오기
async function getPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return data || [];
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <HomeClient initialPosts={posts} />
    </Suspense>
  );
}
