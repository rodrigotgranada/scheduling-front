"use client";

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Scheduling App</h1>
      {session ? (
        <div>
          <p className="mb-4">Olá, {session.user.name}! Veja o que há de novo para você.</p>
          <Link href="/profile">Ir para o perfil</Link>
          {(session.user.role === 'admin' || session.user.role === 'owner') && (
            <div className="mt-4">
              <Link href="/admin">Acessar setor administrativo</Link>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p className="mb-4">Por favor, faça login para acessar mais funcionalidades.</p>
          <Link href="/api/auth/signin">Entrar</Link>
        </div>
      )}
    </div>
  );
}
