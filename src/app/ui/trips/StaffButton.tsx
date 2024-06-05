'use client';
import React from "react";
import styles from "@/app/ui/forms/forms.module.scss";
import Link from "next/link";

interface StaffButtonProps {
    label: string;
    dest: string;
    isStaff: boolean;
}

export const StaffButton: React.FC<StaffButtonProps> = ({label, dest, isStaff}) => {


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