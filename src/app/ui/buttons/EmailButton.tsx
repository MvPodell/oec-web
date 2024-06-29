"use client";
import React from "react";
import { Cross1Icon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import styles from "@/app/ui/buttons/editButton.module.scss";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { TripEmails } from "../trips/TripEmails";
import { oecUser } from "../profile/Profile";

interface EmailButtonProps {
  signedUpUsers: oecUser[];
  capacity: number;
}

export const EmailButton: React.FC<EmailButtonProps> = ({
 signedUpUsers, capacity
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Trigger className={styles.staffButton}>
          <EnvelopeClosedIcon />
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className={styles.AlertDialogOverlay} />
          <AlertDialog.Content className={styles.AlertDialogContent}>
            <div className={styles.formWrapper}>
              <AlertDialog.Cancel asChild>
                <Cross1Icon className={styles.formCancel} />
              </AlertDialog.Cancel>
              <AlertDialog.Title className={styles.AlertDialogTitle}>
                Student Roster
              </AlertDialog.Title>
              <AlertDialog.Description
                className={styles.AlertDialogDescription}
              >
                Copy the list of emails needed.
              </AlertDialog.Description>

                <TripEmails signedUpUsers={signedUpUsers} capacity={capacity} />
              
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
};
