import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const ADMIN_AUTH_COOKIE = 'admin_token';
export const ADMIN_SESSION_VALUE = 'fastfix_authenticated_session';

/**
 * Kiểm tra xem request hiện tại có quyền quản trị viên hay không.
 */
export async function isAuthenticatedAdmin(request?: Request | NextRequest): Promise<boolean> {
  try {
    // 1. Kiểm tra từ cookies() helper của Next.js
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_AUTH_COOKIE)?.value;
    if (token === ADMIN_SESSION_VALUE) {
      return true;
    }

    // 2. Kiểm tra từ header Cookie nếu request được truyền vào
    if (request) {
      const cookieHeader = request.headers.get('cookie') || '';
      const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${ADMIN_AUTH_COOKIE}=([^;]*)`));
      if (match && match[1] === ADMIN_SESSION_VALUE) {
        return true;
      }
    }

    return false;
  } catch {
    return false;
  }
}
