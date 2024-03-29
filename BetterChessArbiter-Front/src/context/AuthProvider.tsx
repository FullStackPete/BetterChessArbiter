import { ReactNode, createContext, useState } from "react";
type AuthProviderType = {
  children: ReactNode;
};
export type AuthType = {
  token: string | null;
  role: string | null;
};
const AuthContext = createContext<AuthType | undefined>({ undefined });
export const AuthProvider = ({ children }: AuthProviderType) => {
  const [auth, setAuth] = useState<AuthType>({ token: null, role: null });

  return (
    <AuthContext.Provider value={{ ...auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
