'use client';
import React from "react";
import styles from "@/app/ui/buttons/buttons.module.scss";
import Link from "next/link";
import { useAuth } from "@/config/AuthContext";

interface AddButtonProps {
    label: string;
    dest: string;
}

export const AddButton: React.FC<AddButtonProps> = ({label, dest}) => {
    const { isStaff } = useAuth();

    return (
        <>
            {isStaff && (
                <div className={styles.addButtonContainer}>
                    <Link href={`${dest}`} className={styles.addButton}>
                        {label}
                    </Link>
                </div>

            )}
        </>
    );
}