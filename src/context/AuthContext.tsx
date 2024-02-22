import  { useContext, ReactNode } from "react";
import { useState, createContext } from "react";
import { IAuthContext, IUser } from "../interface/type";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContext>({
  user: {
    name:null,
    adminId: null,
    email:null,
  },
  updateUserData: () => {},
});

function AuthProvider({ children }: AuthProviderProps) {
  // Specify the type for children prop
  const [user, setuser] = useState<IUser | null>(null);

  const updateUserData = (user: IUser | null) => {
    if (user) {
      setuser({
        ...user,
      });
    } else {
      setuser(null);
    }
  };

  const contextValue: IAuthContext = {
    user,
    updateUserData,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext<IAuthContext>(AuthContext);
  return context;
}

export default AuthProvider;
