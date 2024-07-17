"use client";
import React from "react";
import { Cross1Icon, CheckboxIcon } from "@radix-ui/react-icons";
import styles from "@/app/ui/buttons/dialogButton.module.scss";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { oecUser } from "../profile/Profile";
import { TripConfirm } from "../trips/TripConfirm";
import { Trip } from "@/app/dashboard/trips/page";

interface ConfirmButtonProps {
  signedUpUsers: oecUser[];
  // confirmed: string[];
  trip: Trip;
  // tripId: string;
  // setConfirmed: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({
 signedUpUsers, trip
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Trigger className={styles.staffButton}>
          <CheckboxIcon />
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className={styles.AlertDialogOverlay} />
          <AlertDialog.Content className={styles.AlertDialogContent}>
            <div className={styles.formWrapper}>
              <AlertDialog.Cancel asChild>
                <Cross1Icon className={styles.formCancel} />
              </AlertDialog.Cancel>
              <AlertDialog.Title className={styles.AlertDialogTitle}>
                Confirm Students
              </AlertDialog.Title>
              <AlertDialog.Description
                className={styles.AlertDialogDescription}
              >
                Click the checkbox to confirm a student.
              </AlertDialog.Description>
                <TripConfirm trip={trip} signedUpUsers={signedUpUsers} setOpen={setOpen} />
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
};
