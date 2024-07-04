"use client";
import React from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import styles from "@/app/ui/buttons/editButton.module.scss";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { AdminTabs } from "../footer/AdminTabs";

export const AdminPanelButton: React.FC = ({}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Trigger className={styles.adminButton}>
          Admin Panel
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className={styles.AlertDialogOverlay} />
          <AlertDialog.Content className={styles.AlertDialogContent}>
            <div className={styles.formWrapper}>
              <AlertDialog.Cancel asChild>
                <Cross1Icon className={styles.formCancel} />
              </AlertDialog.Cancel>
              <AlertDialog.Title className={styles.AlertDialogTitle}>
                Admin Panel
              </AlertDialog.Title>
              <AdminTabs setOpen={setOpen} />
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
};
