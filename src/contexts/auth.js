import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({
  signed: false,
  user: null,
  authenticate: (user) => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    if (userStorage) {
      setUser(JSON.parse(userStorage));
      setSigned(true);
    }
  }, []);

  function authenticate(user) {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setSigned(true);
  }

  return (
    <AuthContext.Provider value={{ user, signed, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
