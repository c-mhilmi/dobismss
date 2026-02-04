import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Mock Users Database
const MOCK_USERS = [
    { id: 'u1', name: 'May Customer', email: 'may@test.com', password: '123', role: 'customer', balance: 50.00 },
    { id: 'u2', name: 'John Staff', email: 'staff@dobi.com', password: '123', role: 'staff' },
    { id: 'u3', name: 'Super Admin', email: 'admin@dobi.com', password: '123', role: 'admin' },
];

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for persisted session
        const storedUser = localStorage.getItem('dobi_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
                if (foundUser) {
                    const { password, ...userWithoutPass } = foundUser;
                    setUser(userWithoutPass);
                    localStorage.setItem('dobi_user', JSON.stringify(userWithoutPass));
                    resolve(userWithoutPass);
                } else {
                    reject(new Error('Invalid email or password'));
                }
            }, 800); // Simulate network delay
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('dobi_user');
    };

    // For demo: function to update user balance locally
    const updateUserBalance = (newBalance) => {
        if (user) {
            const updatedUser = { ...user, balance: newBalance };
            setUser(updatedUser);
            localStorage.setItem('dobi_user', JSON.stringify(updatedUser));
        }
    };

    const value = {
        user,
        login,
        logout,
        loading,
        updateUserBalance
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
