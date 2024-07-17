"use client";
import React, { useEffect, useRef } from "react";
import styles from "@/app/ui/forms/forms.module.scss";
import { updateUser } from "@/config/firestore/firestore";
import { useProfile } from "@/config/ProfileContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export const EditUserForm = () => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const lastInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const { userData } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (userData) {
      if (firstInputRef.current) {
        firstInputRef.current.value = userData.firstName || "";
      }
      if (lastInputRef.current) {
        lastInputRef.current.value = userData.lastName || "";
      }
      if (emailInputRef.current) {
        emailInputRef.current.value = userData.email || "";
      }
    }
  }, [userData]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      if (userData) {
        await updateUser(
          firstInputRef.current?.value || "",
          lastInputRef.current?.value || "",
          userData.id,
          emailInputRef.current?.value || "",
          userData.role,
          userData.username
        );
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error updating user in firestore: ", error);
    }
  };

  return (
    <div className={styles.loginModule}>
      <div className={styles.formHeaderContainer}>
        <div className={styles.formBackContainer}>
          <Link className={styles.formBackButton} href="/dashboard">
            <ArrowLeftIcon />
          </Link>
        </div>
        <div className={styles.formHeader}>Edit Profile</div>
      </div>
      <div className={styles.formFieldsContainer}>
        <form className={styles.formFields}>
          <div className={styles.formInputContainer}>
            <label htmlFor="firstname" className={styles.formLabel}>
              First Name
            </label>
            <input
              id="firstname"
              className={styles.formInput}
              ref={firstInputRef}
              type="text"
              required
            ></input>
          </div>
          <div className={styles.formInputContainer}>
            <label htmlFor="lastname" className={styles.formLabel}>
              Last Name
            </label>
            <input
              id="lastname"
              className={styles.formInput}
              ref={lastInputRef}
              type="text"
              required
            ></input>
          </div>
          <div className={styles.formInputContainer}>
            <label htmlFor="email" className={styles.formLabel}>
              Email
            </label>
            <input
              id="email"
              className={styles.formInput}
              ref={emailInputRef}
              type="text"
              required
            ></input>
          </div>
          <div className={styles.formSubmitContainer}>
            <button
              type="submit"
              className={styles.ButtonBlue}
              onClick={handleSubmit}
            >
              Submit Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
