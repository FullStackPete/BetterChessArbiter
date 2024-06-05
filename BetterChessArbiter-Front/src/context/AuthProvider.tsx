import { JwtPayload } from "jwt-decode";
import { PropsWithChildren, createContext, useState } from "react";

export type AuthType = {
  token: string;
  role: string;
  decodedToken: JwtPayload;
};


type AuthContext = {
  auth: AuthType | undefined;
  setAuth: React.Dispatch<React.SetStateAction<AuthType | undefined>>;
};
const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuth] = useState<AuthType>();

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
