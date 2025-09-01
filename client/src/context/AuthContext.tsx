import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";



interface User {
  name: string;
  email?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  setAuth: ({ token, user }: { token: string; user: User }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem("kh_user");
    return raw ? JSON.parse(raw) : null;
  });

  function setAuth({ token, user }: { token: string; user: User }) {
    localStorage.setItem("kh_token", token);
    localStorage.setItem("kh_user", JSON.stringify(user));
    setUser(user);
  }

  function logout() {
    localStorage.removeItem("kh_token");
    localStorage.removeItem("kh_user");
    setUser(null);
  }

  useEffect(() => {
    // optional token verification
  }, []);

  return (
    <AuthContext.Provider value={{ user, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
