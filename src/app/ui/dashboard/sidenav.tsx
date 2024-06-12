"use client";
import React, { useState, useEffect } from "react";
import styles from "@/app/ui/dashboard/sidenav.module.scss";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/ui/dashboard/OECtemplogo.png";
import { getAuth, signOut } from "firebase/auth";
import { Squash as Hamburger } from "hamburger-react";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const auth = getAuth();
  const path = usePathname();
  const links = [
    { name: "Home", key: "", href: "/dashboard" },
    { name: "Trips", key: "trips", href: "/dashboard/trips" },
    { name: "Resources", key: "resources", href: "/dashboard/resources" },
    { name: "About Us", key: "about", href: "/dashboard/about" },
  ];

  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [isOpen, setOpen] = useState(false);
  const [tab, setTab] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

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

  useEffect(() => {
    const currTab = path.split("/");
    if (currTab && currTab.length > 3) {
      if (currTab[3].includes("trip-details")) {
        setTab("trips");
      }
    } else if (currTab && currTab.length == 3) {
      if (currTab[2].includes("event-details")) {
        setTab("");
      } else {
        setTab(currTab[2]);
      }
    } else {
      setTab("");
    }
  }, [path]);

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
            (currentUser ? (
              <div className={styles.topLogout}>
                <div className={styles.topLogoutItem}>
                  <button
                    key="logout"
                    className={styles.logoutButton}
                    onClick={logoutUser}
                  >
                    <b>Logout</b>
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
                    <b>Login</b>
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
                  // onClick={() => handleTabClick(link.name as "Home" | "Trips" | "Resources" | "About Us")}
                >
                  <div
                    className={
                      tab === link.key
                        ? styles.highlightItem
                        : styles.deskNavItem
                    }
                  >
                    {link.name}
                  </div>
                </Link>
              );
            })}
            <div className={styles.deskNavItemFill}>
              {/* remove later */}
              {currentUser ? `Welcome ${currentUser.email}` : ""}
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
                // onClick={() => handleTabClick(link.name as "Home" | "Trips" | "Resources" | "About Us")}
              >
                <div
                  className={
                    tab === link.key ? styles.highlightItem : styles.deskNavItem
                  }
                >
                  {link.name}
                </div>
              </Link>
            );
          })}
        </div>
        <div className={styles.deskNavItemFill}>
          {/* remove later */}
          {currentUser ? `Welcome ${currentUser.email}` : ""}
        </div>
        {currentUser ? (
          <div className={styles.deskLogout}>
            <button
              key="logout"
              className={styles.logoutButton}
              onClick={logoutUser}
            >
              <b>Logout</b>
            </button>
          </div>
        ) : (
          <div className={styles.deskLogout}>
            <Link
              key="login"
              href={"/form/login"}
              className={styles.deskNavLink}
            >
              <b className={styles.loginButton}>Login</b>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
