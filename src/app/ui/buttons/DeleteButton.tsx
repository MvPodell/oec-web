'use client';
import React from "react";
import styles from "@/app/ui/buttons/buttons.module.scss";
import { Cross1Icon } from '@radix-ui/react-icons';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { deleteEvent } from "@/config/firestore";

interface DeleteButtonProps {
    eventId: string;
    onDelete: () => void;

}


export const DeleteButton: React.FC<DeleteButtonProps> = ( {eventId, onDelete} ) => {

    const handleDelete = async () => {
        try {
            await deleteEvent(eventId).then(() => console.log("event deleted!"));
            onDelete();
            // TODO: make sure image is also deleted from firebase storage
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
        
    }

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                <button className={styles.itemDelete}>
                    <Cross1Icon />
                </button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
      <AlertDialog.Overlay className={styles.AlertDialogOverlay} />
      <AlertDialog.Content className={styles.AlertDialogContent}>
        <AlertDialog.Title className={styles.AlertDialogTitle}>Are you absolutely sure?</AlertDialog.Title>
        <AlertDialog.Description className={styles.AlertDialogDescription}>
          This action cannot be undone. This will permanently this event and remove its
          data from our servers.
        </AlertDialog.Description>
        <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
          <AlertDialog.Cancel asChild>
            <button className={styles.ButtonMauve}>Cancel</button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button className={styles.ButtonRed} onClick={handleDelete}>Yes, delete event</button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
        </AlertDialog.Root>

    );
}