import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { authService } from "modules/auth/services/authService";

type AuthProviderProps = {
  children: ReactNode;
};
const AuthContext = createContext(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuth, setIsAuth] = useState(authService.isAuth());
  const [userId, setUserId] = useState(authService.getID());
  const [userRole, setUserRole] = useState(authService.getRole());

  const onUpdate = () => {
    setIsAuth(authService.isAuth());
    setUserId(authService.getID());
    setUserRole(authService.getRole());
  };

  useEffect(() => {
    authService.attachObserverCallback(onUpdate);
    return () => authService.detachObserverCallback();
  }, [isAuth]);

  const isAdmin = userRole === "Admin";
  return (
    <AuthContext.Provider value={{ isAuth, userId, userRole, isAdmin }}>
      {children},
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
