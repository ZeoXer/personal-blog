import { isAuthenticated, setAuthToken } from "@/data/client/token";
import { createContext, useContext, useState, useEffect } from "react";

type AuthContextProps = {
  isLogin: boolean;
  clientLogin: (token: string) => void;
  clientLogout: () => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: any }) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      setIsLogin(true);
    }
  }, []);

  const clientLogin = (token: string) => {
    setAuthToken(token);
    setIsLogin(true);
  };

  const clientLogout = () => {
    setAuthToken("");
    setIsLogin(false);
  };

  const valueToShare: AuthContextProps = {
    isLogin,
    clientLogin,
    clientLogout,
  };

  return (
    <AuthContext.Provider value={valueToShare}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
