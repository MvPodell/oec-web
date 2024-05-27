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
        { name: 'Trips', href: '/dashboard/trips'},
        { name: 'Services', href: '/dashboard/services' },
        { name: 'Resources', href: '/dashboard/resources' },
        { name: 'Contact', href: '/dashboard/contact' },
        { name: 'About Us', href: '/dashboard/about' },
    ];

    const [loginStatus, setLoginStatus] = useState<"login" | "logout">("login");

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
            <div className={styles.leftNavItemFill}>
                 {/* remove later */}
                {currentUser ? (`Welcome ${currentUser.email}`): ("")}
            </div>
            {currentUser ? (
                <Link
                    key="logout"
                    href={"/dashboard"}
                    className={styles.leftNavLink}
                    onClick={(e)=> logoutUser(e)}>
                    <div className={styles.leftNavItem}>
                        <b>Logout</b>
                    </div>
                </Link>
            ) : (
                <Link
                    key="login"
                    href={"/login"}
                    className={styles.leftNavLink}>
                    <div className={styles.leftNavItem}>
                        <b>Login</b>
                    </div>
                </Link>
            )}
        </div>
    );
}