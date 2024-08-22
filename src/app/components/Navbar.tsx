import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
// import { signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">Scheduling App</Link>
        <div>
          {session ? (
            <>
              <Link href="/profile">Perfil</Link>
              {(session.user.role === "admin" ||
                session.user.role === "owner") && (
                <Link href="/admin">Admin</Link>
              )}
              <button onClick={handleLogout}>Sair</button>
            </>
          ) : (
            <>
              <Link href="/register">Registrar</Link>
              <Link href="/login">Entrar</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
