"use client";
import React from "react";
import styles from "@/app/ui/footer/footer.module.scss";
import { AdminPanelButton } from "../buttons/AdminPanelButton";

export const Footer = () => {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.buttonContainer}>
                <AdminPanelButton />
            </div>
            <div className={styles.footerText}>Made with love by OEC Staff Alumni</div>

        </div>
    )
}