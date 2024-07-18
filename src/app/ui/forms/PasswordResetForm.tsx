"use client";
import React, { useState } from "react";
import styles from "@/app/ui/forms/forms.module.scss";
import Link from "next/link";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export const PasswordResetForm = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const router = useRouter();
  const auth = getAuth();
  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Password reset email sent!");
        setSent(true);
        router.push("/dashboard");
      })
      .catch((error) => {
        console.error("Problem sending password reset email", error);
      });
  };

  return (
    <div className={styles.loginModule}>
      <div className={styles.formHeaderContainer}>
        <div className={styles.formBackContainer}>
          <Link className={styles.formBackButton} href="/account/login">
            <ArrowLeftIcon />
          </Link>
        </div>
        <div className={styles.formHeader}>Password Reset</div>
      </div>
      <div className={styles.formFieldsContainer}>
        <form className={styles.formFields}>
          <div className={styles.formInputContainer}>
            <label htmlFor="exampleInputEmail1" className={styles.formLabel}>
              Email address
            </label>
            <input
              type="email"
              className={styles.formInput}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          {sent == false ? (
            <div className={styles.formSubmitContainer}>
              <button
                type="submit"
                className={styles.ButtonBlue}
                onClick={handleReset}
              >
                Submit
              </button>
            </div>
          ) : (
            <div>
              Password reset email sent. Please check your inbox and spam
              folder.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
