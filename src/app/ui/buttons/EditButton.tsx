"use client";
import React from "react";
import { Pencil1Icon, Cross1Icon } from "@radix-ui/react-icons";
import styles from "@/app/ui/buttons/buttons.module.scss";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { EditEventForm } from "../forms/EditEventForm";
import { EditTripForm } from "../forms/EditTripForm";
import { getEvent } from "@/config/firestore";

interface EditButtonProps {
  editType: "event" | "trip";
  id: string;
  isStaff: boolean;
}

export const EditButton: React.FC<EditButtonProps> = ({
  editType,
  id,
  isStaff,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {isStaff && (
        <AlertDialog.Root open={open} onOpenChange={setOpen}>
          <AlertDialog.Trigger className={styles.staffButton}>
            <Pencil1Icon />
          </AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Overlay className={styles.AlertDialogOverlay} />
            <AlertDialog.Content className={styles.AlertDialogContent}>
              <div className={styles.formWrapper}>
                <AlertDialog.Cancel asChild>
                  <Cross1Icon className={styles.formCancel} />
                </AlertDialog.Cancel>
                <AlertDialog.Title className={styles.AlertDialogTitle}>
                  {editType==="event" ? "Edit Event" : "Edit Trip"}
                </AlertDialog.Title>
                <AlertDialog.Description
                  className={styles.AlertDialogDescription}
                >
                  This action cannot be undone. This will permanently edit this {editType}.
                </AlertDialog.Description>

                {editType==="event" && (<EditEventForm eventId={id} setOpen={setOpen} />)}
                {editType==="trip" && (<EditTripForm tripId={id} setOpen={setOpen} />)}
              </div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      )}
    </>
  );
};
