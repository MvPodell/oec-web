"use client";
import React, { useState } from "react";
import styles from "@/app/ui/dashboard/topnav.module.scss";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/images/OECTempLogoBlue.png";
import { getAuth, signOut } from "firebase/auth";
import { Squash as Hamburger } from "hamburger-react";
import { useAuth } from "@/config/AuthContext";
import { Profile } from "../profile/Profile";

export default function TopNav() {
  const links = [
    { name: "HOME", key: "", href: "/dashboard" },
    { name: "TRIPS", key: "trips", href: "/dashboard/trips" },
    { name: "RESOURCES", key: "resources", href: "/dashboard/resources" },
    { name: "ABOUT", key: "about", href: "/dashboard/about" },
  ];
  const auth = getAuth();
  const { user } = useAuth()

  const [isOpen, setOpen] = useState(false);

  const logoutUser = async (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("attempting to sign out");
    signOut(auth)
      .then(() => {
        console.log("user logged out");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.mobileBar}>
        <div className={styles.mobileBarRow}>
          <div className={styles.hamburgerContainer}>
            <Hamburger
              toggled={isOpen}
              size={20}
              toggle={setOpen}
              color="#0057b8"
            />
          </div>
          {!isOpen && <Image src="/images/OECTempLogoBlue.png" width="50" height="50" alt="mobile logo" className={styles.mobileLogo} />}

          {isOpen &&
            (user ? (
              <div className={styles.mobileLogout}>
                <div className={styles.mobileLogoutItem}>
                  <button
                    key="logout"
                    className={styles.logoutButton}
                    onClick={logoutUser}
                  >
                    <b>LOGOUT</b>
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.mobileLogout}>
                <Link
                  key="login"
                  href={"/account/login"}
                  className={styles.deskNavLink}
                >
                  <div className={styles.mobileLogoutItem}>
                    <b>LOGIN</b>
                  </div>
                </Link>
              </div>
            ))}
        </div>
        {isOpen && (
          <div>
            {links.map((link) => {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={styles.deskNavLink}
                  prefetch={link.name === "TRIPS"}
                >
                  <div
                    className={styles.deskNavItem}
                  >
                    {link.name}
                  </div>
                </Link>
              );
            })}
            <div className={styles.deskNavItemFill}>
              {/* remove later */}
              {user ? `Welcome ${user.email}` : ""}
            </div>
          </div>
        )}
      </div>
      <div className={styles.deskBar}>
        <div className={styles.deskLogo}>
          <Image
            alt="OEC logo"
            src={Logo}
            className={styles.logoImage}
            priority
          />
        </div>
        <div className={styles.deskLinks}>
          {links.map((link) => {
            return (
              <Link
                key={link.name}
                href={link.href}
                className={styles.deskNavLink}
              >
                <div
                  className={styles.deskNavItem}
                >
                  {link.name}
                </div>
              </Link>
            );
          })}
        </div>
        <div className={styles.deskNavItemFill}>
          {/* remove later */}
          {user ? `Welcome ${user.email}` : ""}
        </div>
        {user ? (
          <div className={styles.deskLogout}>
            <div className={styles.buttonContainer}>
              <Profile />
            </div>
            <button
              key="logout"
              className={styles.logoutButton}
              onClick={logoutUser}
            >
              <b>LOGOUT</b>
            </button>
            
          </div>
        ) : (
          <div className={styles.deskLogout}>
            <Link
              key="login"
              href={"/account/login"}
              className={styles.deskNavLink}
            >
              <b className={styles.loginButton}>LOGIN</b>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
