import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Day 4: hydrate this from localStorage on load

  // Day 4 task: call POST /api/auth/login, store the token + decoded user,
  // then setUser(...). Same idea for signup.
  const login = async (/* email, password */) => {
    throw new Error("TODO: implement login on Day 4");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
