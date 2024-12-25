import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .get('/user-info', { withCredentials: true })
            .then((response) => {
                const userInfo = response.data;
                if ((userInfo?.id || userInfo?.sub) && userInfo?.name) {
                    setIsAuthenticated(true);
                    setUser(userInfo);
                    console.log('Authenticated:', userInfo);
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                    console.log('Not authenticated:', userInfo);
                }
            })
            .catch((error) => {
                setIsAuthenticated(false);
                setUser(null);
                console.error('Error fetching user info:', error);
            });
    }, [isAuthenticated]);
    
    

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
