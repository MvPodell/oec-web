'use client';

import React from "react";
import { auth } from "./firebaseConfig";
import {  User } from "firebase/auth";

export type oecUser = User | null;
type ContextState = { user: oecUser };
const FirebaseAuthContext = React.createContext<ContextState | undefined>(undefined);

const FirebaseAuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const value = { user };

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

function useFirebaseAuth(): oecUser {
  const context = React.useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error(
      "useFirebaseAuth must be used within a FirebaseAuthProvider"
    );
  }
  console.log("useFirebaseAuth context:", context);
  return context.user;
};

function UserName() {
  const user: oecUser = useFirebaseAuth();
  return <div>{user?.displayName || "unauthenticated"}</div>;
}

export { FirebaseAuthProvider, useFirebaseAuth, UserName };