"use client";

import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Profile() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      
      if (session?.user.token) {
        const decodedToken = jwtDecode(session?.user.token);
          console.log('Decoded Token:', decodedToken); 
        console.log('Authorization Header:', `Bearer ${session?.user.token}`);
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          });
          console.log('res', res);
  
          if (res.ok) {
            const data = await res.json();
            setUserData(data);
          } else {
            console.error('Failed to fetch user data:', res.statusText);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
  
    fetchUserData();
  }, [session]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome, {userData.email}</p>
    </div>
  );
}
