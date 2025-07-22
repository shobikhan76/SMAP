import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // e.g., { name, role, token }

  const login = (userData) => {
    setUser(userData); // Save user info and token
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for cleaner usage
export const useAuth = () => useContext(AuthContext);
