"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader } from "../components/loader";
import { User } from "../models/user";
import authService from "../services/auth/authService";
import { ROOT_ROUTE, protectedRoutes } from "../constants/routes";

export interface AuthContext {
  user: User | null;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const currentRoute = usePathname();
  const isProtectedRoute = protectedRoutes.includes(currentRoute);

  useEffect(() => {
    const unsubscribe = authService.onAuthChange((userUpdate: any) => {
      setUser(userUpdate);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !user && isProtectedRoute) {
      router.push(ROOT_ROUTE);
    }
  }, [user, loading, isProtectedRoute, router]);

  if (loading || (!user && isProtectedRoute)) {
    return <Loader isFullPage />;
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
