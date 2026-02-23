import { cookies } from 'next/headers';

const ADMIN_TOKEN_COOKIE = 'admin_token';
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  return password === adminPassword;
}

// Store valid tokens in memory (resets on server restart)
const validTokens = new Map<string, number>();

export function createSession(): string {
  const token = generateToken();
  validTokens.set(token, Date.now() + TOKEN_EXPIRY);
  return token;
}

export function isValidSession(token: string): boolean {
  const expiry = validTokens.get(token);
  if (!expiry) return false;
  if (Date.now() > expiry) {
    validTokens.delete(token);
    return false;
  }
  return true;
}

export function deleteSession(token: string): void {
  validTokens.delete(token);
}

export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_TOKEN_COOKIE)?.value;
}

export async function requireAuth(): Promise<boolean> {
  const token = await getSessionToken();
  if (!token) return false;
  return isValidSession(token);
}
