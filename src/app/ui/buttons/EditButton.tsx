"use client";
import React from "react";
import { Pencil1Icon, Cross1Icon } from "@radix-ui/react-icons";
import styles from "@/app/ui/buttons/buttons.module.scss";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { EditEventForm } from "../forms/EditEventForm";

interface EditButtonProps {
  eventId: string;
  isStaff: boolean;
}

export const EditButton: React.FC<EditButtonProps> = ({eventId, isStaff}) => {
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
              Edit Event
            </AlertDialog.Title>
            <AlertDialog.Description className={styles.AlertDialogDescription}>
              This action cannot be undone. This will permanently edit this
              event.
            </AlertDialog.Description>

            <EditEventForm setOpen={setOpen} />
            {/* <form
            onSubmit={(event) => {
              wait().then(() => setOpen(false));
              event.preventDefault();
            }}
          >

            <button type="submit" className={styles.ButtonRed}>
              Submit
            </button>
          </form> */}
           </div>
          </AlertDialog.Content>
       
      </AlertDialog.Portal>
    </AlertDialog.Root>

    )}
    </>
    
  );
};
