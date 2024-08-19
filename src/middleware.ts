import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || 'default_secret' });

  // Verifica se o usuário está tentando acessar qualquer rota que começa com /profile
  if (!session && req.nextUrl.pathname.startsWith('/profile')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Redireciona usuários logados que tentam acessar a página de login
  if (session && req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/profile/:path*'], // :path* captura todas as sub-rotas de /profile
};
