import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export function useUserData() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user.token) return;

      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/users/me`;
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
          withCredentials: true,
        });

        if (res.status === 200) {
          setUserData(res.data);
        } else {
          console.error('Unauthorized access');
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, [session]);

  return userData;
}
