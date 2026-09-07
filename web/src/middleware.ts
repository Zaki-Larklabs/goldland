import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/auth-helpers';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  // First update session (this refreshes tokens if needed)
  const supabaseResponse = await updateSession(request);
  
  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    // Create an independent client just to check auth status without writing cookies
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // This client is just for checking auth, cookie setting is handled by updateSession
        },
      },
    });

    const { data: { user }, error } = await supabase.auth.getUser();

    // If no user is logged in, redirect them to /login
    if (!user || error) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/login';
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, public files, etc
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
