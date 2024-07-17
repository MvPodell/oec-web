import React from "react";
import styles from "@/app/ui/profile/profile.module.scss";
import { Cross1Icon, PersonIcon } from "@radix-ui/react-icons";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useRouter } from "next/navigation";

export interface oecUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "student" | "staff" | "recruiter";
  username: string;
}


interface ProfileProps {
  userData: oecUser;
}
export const Profile: React.FC<ProfileProps> = ({userData}) => {
  const router = useRouter();

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <div className={styles.profileButtonContainer}>
            <button>
              <PersonIcon />
            </button>
          </div>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className={styles.AlertDialogOverlay} />
          <AlertDialog.Content className={styles.ProfileDialogContent}>
            <div className={styles.profileFormWrapper}>
              <AlertDialog.Cancel asChild>
                <button >
                  <Cross1Icon className={styles.formCancel} />
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Title className={styles.AlertDialogTitle}>
                <div>Profile</div>
              </AlertDialog.Title>
                <AlertDialog.Description
                  className={styles.AlertDialogDescription}
                >
                  <div className={styles.profileLabel}>Name</div>
                    <div>{userData.firstName} {userData.lastName}</div>
                  <div className={styles.profileLabel}>Email</div>
                    <div>{userData.email}</div>
                  <div className={styles.profileLabel}>Account Type</div>
                    <div>{userData.role === "student" ? "Student" : "Staff"}</div>
                </AlertDialog.Description>
                <button className={styles.adminButton} onClick={() => router.push("/account/profile")}>
                  Edit
                </button>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
};
