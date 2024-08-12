"use client"; // Certifique-se de que está rodando como um Client Component

import { useEffect } from 'react';

export default function TestLogin() {
  useEffect(() => {
    async function testLogin() {
      const res = await fetch('/api/auth/session');
      const data = await res.json();
      console.log("Resposta da sessão:", data);
    }

    testLogin();
  }, []);

  return <div>Testing Login API</div>;
}
