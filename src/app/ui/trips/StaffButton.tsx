'use client';
import React, {useEffect, useState} from "react";
import styles from "@/app/ui/forms/forms.module.scss";
import Link from "next/link";
import { getAuth } from "firebase/auth";
import { getUserRole } from "@/config/firestore";

interface StaffButtonProps {
    label: string;
    dest: string;
}

export const StaffButton: React.FC<StaffButtonProps> = ({label, dest}) => {
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
    }, [user, auth]);

    return (
        <>
            {isStaff && (
                <div className={styles.addTripContainer}>
                    <Link href={`${dest}`} className={styles.addTrip}>
                        {label}
                    </Link>
                </div>

            )}
        </>
    );
}