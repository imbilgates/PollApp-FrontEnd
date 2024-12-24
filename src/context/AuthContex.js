import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .get('/user-info', { withCredentials: true })
            .then((response) => {
                setIsAuthenticated(true);
                setUser(response.data);
                console.log(isAuthenticated);
            })
            .catch((error) => {
                setIsAuthenticated(false);
                setUser(null);
            });
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
