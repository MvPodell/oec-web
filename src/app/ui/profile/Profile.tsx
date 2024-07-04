import React, { useEffect, useCallback, useState } from "react";
import { getUserData } from "@/config/firestore";
import styles from "@/app/ui/profile/profile.module.scss";
import { Cross1Icon, PersonIcon } from "@radix-ui/react-icons";
import { useAuth } from "@/config/AuthContext";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { EditUserForm } from "../forms/EditUserForm";

export interface oecUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "student" | "staff";
  username: string;
}

export const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState<oecUser>({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    role: "student",
    username: "",
  });
  const { user } = useAuth();

  const handleEdit = () => {
    setEditMode(true);
    // console.log(editMode);
  };

  const handleCancel = () => {
    setEditMode(false);
  }

  const fetchUser = useCallback(async () => {
    const fetchUserData = async () => {
      if (user) {
        const data = await getUserData(user.uid);
        if (data) {
          setUserData(data);
        }
      }
    };
    fetchUserData();
  }, [user]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <div className={styles.profileButtonContainer}>
            <button className={styles.addButton}>
              <PersonIcon />
            </button>
          </div>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className={styles.AlertDialogOverlay} />
          <AlertDialog.Content className={styles.ProfileDialogContent}>
            <div className={styles.profileFormWrapper}>
              <AlertDialog.Cancel asChild>
                <button onClick={handleCancel}>
                  <Cross1Icon className={styles.formCancel} />
                </button>
                
              </AlertDialog.Cancel>
              <AlertDialog.Title className={styles.AlertDialogTitle}>
                Profile
              </AlertDialog.Title>
              {editMode === true ? (
                <>
                  <EditUserForm
                    userData={userData}
                    setOpen={setEditMode}
                    onEdit={fetchUser}
                  />
                </>
              ) : (
                <AlertDialog.Description
                  className={styles.AlertDialogDescription}
                >
                  <div className={styles.profileLabel}>Name</div>
                  {userData.firstName} {userData.lastName}
                  <div className={styles.profileLabel}>Email</div>
                  {userData.email}
                  <div className={styles.profileLabel}>Account Type</div>
                  {userData.role === "student" ? "Student" : "Staff"}
                </AlertDialog.Description>
              )}

              {!editMode && (
                <button className={styles.profileEditButton} onClick={handleEdit}>
                Edit
              </button>
              )}
              
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
};
