// scripts/migrate-posts.ts
import { config } from 'dotenv';
import path from 'path';

// .env.local 파일을 명시적으로 로드
config({ path: path.resolve(process.cwd(), '.env.local') });

import { createClient } from '@supabase/supabase-js';
import { posts } from '../lib/posts';
// ... 나머지 코드 동일
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase credentials not found in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateData() {
  console.log('🚀 Starting migration...');
  console.log(`📊 Total posts to migrate: ${posts.length}`);

  let successCount = 0;
  let errorCount = 0;

  for (const post of posts) {
    try {
      const { error } = await supabase.from('posts').insert({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        image: post.image || null,
        date: new Date(post.date).toISOString(),
        category: post.category,
        author: post.author,
        read_time: post.readTime,
      });

      if (error) {
        console.error(`❌ Failed: ${post.slug}`, error.message);
        errorCount++;
      } else {
        console.log(`✅ Migrated: ${post.slug}`);
        successCount++;
      }
    } catch (err) {
      console.error(`❌ Exception for ${post.slug}:`, err);
      errorCount++;
    }
  }

  console.log('\n📈 Migration Summary:');
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  console.log('🎉 Migration complete!');
}

migrateData();
