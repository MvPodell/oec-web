'use client';
import React, { useState } from 'react';
import styles from '@/app/dashboard/dashboard.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/app/ui/dashboard/OECtemplogo.png';
import { UserName, useFirebaseAuth } from '@/config/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';

export default function SideNav() {
    const links = [
        { name: 'Home', href: '/dashboard' },
        { name: 'Services', href: '/dashboard/services' },
        { name: 'Resources', href: '/dashboard/resources' },
        { name: 'Contact', href: '/dashboard/contact' },
        { name: 'About Us', href: '/dashboard/services' },
    ];

    const [loginStatus, setLoginStatus] = useState<"login" | "logout">("login");
    const user = useFirebaseAuth();
    const currentUser = auth.currentUser;

    const logoutUser = async (e: React.MouseEvent) => {
        e.preventDefault();
    
        await signOut(auth);
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
            <div className={styles.leftNavItemFill}></div>
            {currentUser ? (
                <div className={styles.leftNavLink} id="logout" onClick={(e) => logoutUser(e)}>
                    <div className={styles.leftNavItem} id="logout">
                        <b>Logout</b>
                    </div>
                </div>
            ) : (
                <Link
                    key="login"
                    href={`/${loginStatus}`}
                    className={styles.leftNavLink}>
                    <div className={styles.leftNavItem}>
                        {currentUser ? (
                            <b>Logout</b>
                        ) : (
                            <b>Login</b>
                        )}
                    </div>
                </Link>
            )}
        </div>
    );
}