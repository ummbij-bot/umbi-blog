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

// 데이터를 가져오기 전 supabase 존재 여부를 먼저 확인합니다.
const { data: posts } = supabase
  ? await supabase.from('posts').select('*')
  : { data: [] };
