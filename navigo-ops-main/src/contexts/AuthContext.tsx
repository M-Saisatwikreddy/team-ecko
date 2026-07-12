import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AuthUser, UserRole } from "@/types";

interface AuthState {
  user: AuthUser | null;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  hasRole: (roles?: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthState | null>(null);
const STORAGE_KEY = "beayrik.auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const login = async (email: string, _password: string, role: UserRole = "Fleet Manager") => {
    const u: AuthUser = {
      id: "u1",
      name: email.split("@")[0].replace(/\W/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()) || "Operator",
      email,
      role,
    };
    setUser(u);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const hasRole = (roles?: UserRole[]) => {
    if (!roles || roles.length === 0) return true;
    if (!user) return false;
    return roles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
