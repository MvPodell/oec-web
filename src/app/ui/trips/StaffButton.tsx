'use client';
import React, {useState, useEffect} from "react";
import { Button } from "@radix-ui/themes";
import styles from "@/app/ui/forms/forms.module.scss";
import { getAuth } from "firebase/auth";
import { getUserRole } from "@/config/firestore";
import Link from "next/link";

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
                <Button variant="outline" color="blue" radius="large">
                    <Link href={`${dest}`} className={styles.addTrip}>
                        {label}
                    </Link>
                </Button>

            )}
        </>
    );
}