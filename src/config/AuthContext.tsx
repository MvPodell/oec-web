'use client';

import React, {useEffect, useState, useContext, createContext } from "react";
import { auth } from "./firebaseConfig";
import {  User } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getUserData } from "./firestore";
import { oecUser } from "@/app/ui/profile/Profile";

interface AuthContextState {
  user: User | null;
  isStaff: boolean;
}
const AuthContext = createContext<AuthContextState>({user: null, isStaff: false});

const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isStaff, setIsStaff] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
            setUser(user);
            const userData = await getUserData(user.uid) as oecUser;
            setIsStaff(userData.role === "staff");
        } else {
            setUser(null);
            setIsStaff(false);
        }
    });

    return () => unsubscribe();
}, [user]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, isStaff }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };