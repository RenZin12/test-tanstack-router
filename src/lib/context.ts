import { createContext, useContext } from "react";

export type AuthContextType = {
  getAuthStatus: () => Promise<{
    isAuthenticated: boolean;
    user: string | null;
  }>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  user: string | null;
};

export const AuthContext = createContext<AuthContextType | null>(null);
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
