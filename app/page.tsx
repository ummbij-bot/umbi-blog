// 1. 필요한 라이브러리와 supabase 클라이언트를 가져옵니다.
import { supabase } from '@/lib/supabase'; // 본인의 supabase 설정 파일 경로

// 2. 반드시 'export default'와 'async'가 붙어 있어야 합니다.
export default async function Page() {
  let posts: any[] = [];

  // 3. supabase가 존재할 때만 데이터를 가져오는 안전한 로직
  if (supabase) {
    const { data } = await supabase.from('posts').select('*');
    if (data) posts = data;
  }

  return (
    <main>
      <h1>나의 블로그</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </div>
        ))
      ) : (
        <p>현재 게시글이 없거나 연결을 확인 중입니다.</p>
      )}
    </main>
  );
}