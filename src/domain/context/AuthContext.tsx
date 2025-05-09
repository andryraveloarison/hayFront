// context/AuthContext.tsx
import { createContext, useContext, useState } from "react";
import { authRepository } from "../../application/repository/authRepository";

type AuthContextType = {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean }>;
    logout: () => void;
  };
  
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (email: string, password: string) => {
        try {
        const data = await authRepository.loginRepo(email, password);
        const status = data.success
        if (status) {
            setIsAuthenticated(true)
            return { success: true };
        } else {
            setIsAuthenticated(false)
            return { success: false };
        }
        } catch (error) {
        console.error("Login error:", error);
        return { success: false };
        }
    };
  

    const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
