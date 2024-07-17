"use client";
import React from "react";
import { Cross1Icon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import styles from "@/app/ui/buttons/dialogButton.module.scss";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { TripEmails } from "../trips/TripEmails";
import { oecUser } from "../profile/Profile";
import { Trip } from "@/app/dashboard/trips/page";

interface EmailButtonProps {
  signedUpUsers: oecUser[];
  trip: Trip;
}

export const EmailButton: React.FC<EmailButtonProps> = ({
 signedUpUsers, trip
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

                <TripEmails signedUpUsers={signedUpUsers} trip={trip} />
              
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
};
