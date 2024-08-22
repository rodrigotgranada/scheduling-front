import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-2xl font-bold">Admin Panel</div>
        <nav>
          <ul>
            <li>
              <Link href="/admin/users">Gerenciar Usuários</Link>
            </li>
            {/* <li>
              <Link href="/admin/schedules">Agendamentos</Link>
            </li> */}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
