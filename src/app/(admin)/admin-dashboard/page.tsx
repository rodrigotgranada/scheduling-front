import { useSession } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session } = useSession();

  if (!session) {
    return <p>Loading...</p>;
  }

  // Verificar se o usuário tem a role de administrador
  if (session.user?.role !== 'admin' && session.user?.role !== 'owner') {
    return <p>Access Denied</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="mb-4 text-xl font-bold">Admin Dashboard</h2>
        <p>Welcome, {session.user?.email}</p>
        {/* Adicione aqui os links ou funcionalidades administrativas */}
      </div>
    </div>
  );
}
