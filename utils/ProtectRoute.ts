import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import React from 'react';

const ProtectRoute = (WrappedComponent: any) => {
  return function Protected(props: any) {
    const router = useRouter();

    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          router.replace('/login');
        }
      });
      return () => unsubscribe();
    }, [router]);

    return React.createElement(WrappedComponent, props);
  };
};

export default ProtectRoute;
