import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

interface SessionToken {
  sub: string;
  id: string;
  role: string;
  token: string;
  iat: number;
  exp: number;
  jti: string;
}

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || 'default_secret' }) as SessionToken | null;

  // Verifica se o usuário está tentando acessar rotas protegidas
  if (req.nextUrl.pathname.startsWith('/profile') || req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // console.log('session', session);
    const userRole = session?.role;

    // Verifica se o usuário tem a role necessária para acessar o setor administrativo
    if (req.nextUrl.pathname.startsWith('/admin')) {
      // console.log('userRole', userRole);
      if (userRole !== 'admin' && userRole !== 'owner') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }
  }

  // Redireciona usuários logados que tentam acessar a página de login
  if (session && req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/profile/:path*', '/admin/:path*'],
};
