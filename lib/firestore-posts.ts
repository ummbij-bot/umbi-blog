import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  increment,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Post } from './post-types';

const POSTS_COLLECTION = 'posts';
const VIEWS_COLLECTION = 'post_views';

// ---------- Post CRUD ----------

export async function getAllPostsFromDB(): Promise<Post[]> {
  const q = query(collection(db, POSTS_COLLECTION), orderBy('date', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ ...d.data() } as Post));
}

export async function getPostBySlugFromDB(slug: string): Promise<Post | null> {
  const docRef = doc(db, POSTS_COLLECTION, slug);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return snapshot.data() as Post;
}

export async function getPostsByCategoryFromDB(category: string): Promise<Post[]> {
  const q = query(
    collection(db, POSTS_COLLECTION),
    where('category', '==', category),
    orderBy('date', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ ...d.data() } as Post));
}

export async function createPost(post: Post): Promise<void> {
  await setDoc(doc(db, POSTS_COLLECTION, post.slug), {
    ...post,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
}

export async function updatePost(slug: string, data: Partial<Post>): Promise<void> {
  const docRef = doc(db, POSTS_COLLECTION, slug);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

export async function deletePost(slug: string): Promise<void> {
  await deleteDoc(doc(db, POSTS_COLLECTION, slug));
}

// ---------- View Tracking ----------

export async function incrementViewCount(slug: string): Promise<void> {
  const docRef = doc(db, VIEWS_COLLECTION, slug);
  try {
    await updateDoc(docRef, { views: increment(1) });
  } catch {
    // Document doesn't exist yet, create it
    await setDoc(docRef, { slug, views: 1 });
  }
}

export async function getViewCount(slug: string): Promise<number> {
  const docRef = doc(db, VIEWS_COLLECTION, slug);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return 0;
  return snapshot.data().views || 0;
}

export async function getAllViewCounts(): Promise<Record<string, number>> {
  const snapshot = await getDocs(collection(db, VIEWS_COLLECTION));
  const views: Record<string, number> = {};
  snapshot.docs.forEach((d) => {
    views[d.id] = d.data().views || 0;
  });
  return views;
}

// ---------- Search ----------

export async function searchPosts(queryText: string): Promise<Post[]> {
  // Firestore doesn't support full-text search natively,
  // so we fetch all posts and filter client-side
  const allPosts = await getAllPostsFromDB();
  const lowerQuery = queryText.toLowerCase();
  return allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery)
  );
}

// ---------- Stats ----------

export async function getPostStats(): Promise<{
  total: number;
  byCategory: Record<string, number>;
  totalViews: number;
}> {
  const allPosts = await getAllPostsFromDB();
  const views = await getAllViewCounts();

  const byCategory: Record<string, number> = {};
  allPosts.forEach((post) => {
    byCategory[post.category] = (byCategory[post.category] || 0) + 1;
  });

  const totalViews = Object.values(views).reduce((sum, v) => sum + v, 0);

  return {
    total: allPosts.length,
    byCategory,
    totalViews,
  };
}
