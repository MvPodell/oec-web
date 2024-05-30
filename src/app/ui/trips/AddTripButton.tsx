'use client';
import React, {useState, useEffect} from "react";
import styles from "@/app/ui/forms/forms.module.scss";
import { getAuth } from "firebase/auth";
import { getUserRole } from "@/config/firestore";
import Link from "next/link";

export const AddTripButton = () => {
    const auth = getAuth();
    const [user, setUser] = useState(auth.currentUser);
    const [isStaff, setIsStaff] = useState<boolean>(false);

    useEffect(() => {
        if (!auth) return;
        
        return auth.onAuthStateChanged(async (user) => {
            if (!user) {
                setUser(null);
                setIsStaff(false);
            }
            if (user) {
                setUser(user);

                const userRole = await getUserRole(user.uid);
                if ( userRole && userRole === "staff") {
                    setIsStaff(true);
                } else {
                    setIsStaff(false);
                }
            } 
        })
    }, [user]);

    return (
        <>
            {isStaff && (
                <div className={styles.addTripContainer}>
                    <Link href="/form/add-trip" className={styles.addTrip}>
                        Add Trip
                    </Link>
                </div>

            )}
        </>
    );
}