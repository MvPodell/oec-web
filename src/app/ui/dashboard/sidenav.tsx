'use client';
import React, { useState, useEffect } from 'react';
import styles from '@/app/dashboard/dashboard.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/app/ui/dashboard/OECtemplogo.png';
import { UserName, useFirebaseAuth } from '@/config/AuthContext';
import { getAuth, signOut } from 'firebase/auth';

export default function SideNav() {
    const auth = getAuth();
    const links = [
        { name: 'Home', href: '/dashboard' },
        { name: 'Trips', href: '/dashboard/trips' },
        { name: 'Resources', href: '/dashboard/resources' },
        { name: 'About Us', href: '/dashboard/about' },
    ];

    const [loginStatus, setLoginStatus] = useState<"login" | "logout">("login");
    const [currentUser, setCurrentUser] = useState(auth.currentUser);
    

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoginStatus(user ? "logout" : "login")
            console.log("login state changed to: ", user ? "logout" : "login")
        });
        return () => unsubscribe();
        
    }, [auth]);

    const logoutUser = async (e: React.MouseEvent) => {
        e.preventDefault();
        console.log("attempting to sign out");
        signOut(auth).then(() => {
            setLoginStatus("login");
        console.log("user logged out");
        }).catch((error) => {
            console.error("Error signing out: ", error);
        });
        

    }


    return (
        <div className={styles.leftBar}>
            <div className={styles.leftLogo}>
                <Image
                    alt="OEC logo"
                    src={Logo}
                    className={styles.logoImage}
                />
            </div>
            {links.map((link) => {
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={styles.leftNavLink}
                    >
                        <div className={styles.leftNavItem}>{link.name}</div>
                    </Link>
                );
            })}
            <div className={styles.leftNavItemFill}>
                {/* remove later */}
                {currentUser ? (`Welcome ${currentUser.email}`) : ("")}
            </div>
            {currentUser ? (
                <div className={styles.leftNavItem}>
                    <button
                        key="logout"
                        className={styles.logoutButton}
                        onClick={logoutUser}>
                            <b>Logout</b>
                    </button>
                </div>

            ) : (
                <Link
                    key="login"
                    href={"/form/login"}
                    className={styles.leftNavLink}>
                    <div className={styles.leftNavItem}>
                        <b>Login</b>
                    </div>
                </Link>
            )}
        </div>
    );
}