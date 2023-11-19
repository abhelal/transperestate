"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
    setLoading(false);
  }, []);

  const login = (userData) => {
    let user = {};
    user.email = userData.email;
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const register = (userData) => {
    // Implement your registration logic here
    setUser(userData);
  };

  const logout = () => {
    // Implement your logout logic here
    localStorage.removeItem("user");
    setUser(null);
  };

  const forgotPassword = (email) => {
    // Implement your forgot password logic here
  };

  const verifyEmail = (token) => {
    // Implement your email verification logic here
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, forgotPassword, verifyEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
