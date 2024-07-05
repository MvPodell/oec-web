"use client";
import React from "react";
import styles from "@/app/ui/footer/footer.module.scss";
import { AdminPanelButton } from "../buttons/AdminPanelButton";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useAuth } from "@/config/AuthContext";

export const Footer = () => {
    const {isStaff} = useAuth();

    return (
        <div className={styles.footerContainer}>
            {isStaff && (
                <div className={styles.buttonContainer}>
                    <AdminPanelButton />
                </div>
            )}
            <div className={styles.footerContent}>
                <div className={styles.footerText}>Made by OEC Staff Alumni</div>
                <div> | </div>
                <a href="https://github.com/MvPodell/oec-web" target="_blank" className={styles.githubIcon}>
                    <GitHubLogoIcon />
                </a>
                
            </div>
            
        </div>
    )
}