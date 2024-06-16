"use client";
import React, { useState } from "react";
import styles from "@/app/ui/dashboard/sidenav.module.scss";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/images/OECTempLogoBlue.png";
import { getAuth, signOut } from "firebase/auth";
import { Squash as Hamburger } from "hamburger-react";
import { useAuth } from "@/config/AuthContext";

export default function SideNav() {
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
      <div className={styles.topBar}>
        <div className={styles.topBarRow}>
          <Hamburger
            toggled={isOpen}
            size={20}
            toggle={setOpen}
            color="#0057b8"
          />
          {isOpen &&
            (user ? (
              <div className={styles.topLogout}>
                <div className={styles.topLogoutItem}>
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
              <div className={styles.topLogout}>
                <Link
                  key="login"
                  href={"/form/login"}
                  className={styles.deskNavLink}
                >
                  <div className={styles.topLogoutItem}>
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
              href={"/form/login"}
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
