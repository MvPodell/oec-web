'use client';

import React, {useEffect, useState, useContext, createContext, useCallback } from "react";
import { getUserData } from "./firestore/firestore";
import { useAuth } from "./AuthContext";

export interface oecUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "student" | "staff" | "recruiter";
    username: string;
  }

interface ProfileContextState {
  userData: oecUser | null; 
}

const ProfileContext = createContext<ProfileContextState>({ userData: null });

const ProfileProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<oecUser | null>(null);

  const fetchUser = useCallback(async () => {
    const fetchUserData = async () => {
      if (user) {
        const data = await getUserData(user.uid);
        if (data) {
          setUserData(data);
        } else {
          setUserData(null); // In case no data is returned
        }
      }
    };
    fetchUserData();
  }, [user]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <ProfileContext.Provider value={{ userData }}>
      {children}
    </ProfileContext.Provider>
  );
};

const useProfile = () => {
  return useContext(ProfileContext);
};

export { ProfileProvider, useProfile };