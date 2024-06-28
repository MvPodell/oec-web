"use client";
import React, { useEffect, useRef } from "react";
import * as Form from "@radix-ui/react-form";
import styles from "@/app/ui/forms/forms.module.scss";
import { oecUser } from "../profile/Profile";
import { getAuth } from "firebase/auth";
import { updateUser } from "@/config/firestore";

interface EditUserFormProps {
  userData: oecUser;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onEdit: () => void;
}

export const EditUserForm: React.FC<EditUserFormProps> = ({
  userData,
  setOpen,
  onEdit,
}) => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const lastInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.value = userData.firstName || "";
    }
    if (lastInputRef.current) {
      lastInputRef.current.value = userData.lastName || "";
    }
    if (emailInputRef.current) {
      emailInputRef.current.value = userData.email || "";
    }
  }, [userData.firstName, userData.lastName, userData.email]);


  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      if (user) {
        await updateUser(
            firstInputRef.current?.value || "",
            lastInputRef.current?.value || "",
            user.uid,
            emailInputRef.current?.value || "",
            userData.role,
            userData.username
          );
      } 
      setOpen(false);
      onEdit();
    } catch (error) {
      console.error("Error updating user in firestore: ", error);
    }
  };

  return (
    <Form.Root className={styles.FormRoot}>
      <Form.Field className={styles.FormField} name="first-name">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className={styles.FormLabel}>First Name</Form.Label>
        </div>
        <Form.Control asChild>
          <input
            ref={firstInputRef}
            className={styles.Input}
            type="text"
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className={styles.FormField} name="last-name">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className={styles.FormLabel}>Last Name</Form.Label>
        </div>
        <Form.Control asChild>
          <input
            ref={lastInputRef}
            className={styles.Input}
            type="text"
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className={styles.FormField} name="email">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className={styles.FormLabel}>Email</Form.Label>
        </div>
        <Form.Control asChild>
          <input
            ref={emailInputRef}
            className={styles.Input}
            type="text"
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <div className={styles.profileSubmitContainer}>
        <button className={styles.ButtonBlue} onClick={handleSubmit}>
          Submit edits
        </button>
        </div>
        
      </Form.Submit>
    </Form.Root>
  );
};
