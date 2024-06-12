import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearAuth } from "@/redux/auth/auth.slice";
import { RootState } from "@/redux/store";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useAuthSession = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthSession = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('/api/auth/session', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            dispatch(setUser(data.user));
          } else {
            dispatch(clearAuth());
            localStorage.removeItem('token');
            toast.error('Session expired or invalid. Please log in again.');
          }
        } catch (error) {
          console.error('Error checking auth session:', error);
          dispatch(clearAuth());
          localStorage.removeItem('token');
          toast.error('Error checking authentication session. Please try again.');
        }
      } else {
        dispatch(clearAuth()); 
      }
      setLoading(false);
    };

    checkAuthSession();
  }, [dispatch]);

  return { user, loading };
};

export default useAuthSession;


