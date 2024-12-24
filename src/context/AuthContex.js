import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get('https://pollapp-dk9u.onrender.com/user-info', { withCredentials: true })
      .then((res) => {
        setIsAuthenticated(true)
        console.log(res.data);
      })
      .catch(() => setIsAuthenticated(false));

    console.log(isAuthenticated);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;