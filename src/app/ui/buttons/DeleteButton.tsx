"use client";
import React from "react";
import styles from "@/app/ui/buttons/dialogButton.module.scss";
import { Cross1Icon } from "@radix-ui/react-icons";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { deleteTrip } from "@/config/firestore/tripFirestore";
import { deleteEvent } from "@/config/firestore/eventFirestore";
import { deleteStaff } from "@/config/firestore/staffFirestore";

interface DeleteButtonProps {
  deleteType: "event" | "trip" | "staff";
  id: string;
  onDelete: () => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  deleteType,
  id,
  onDelete,
}) => {
  const handleDeleteEvent = async () => {
    try {
      await deleteEvent(id).then(() => console.log("event deleted!"));
      onDelete();
      // TODO: make sure image is also deleted from firebase storage
    } catch (error) {
      console.error("Error deleting event: ", error);
    }
  };

  const handleDeleteTrip = async () => {
    try {
      await deleteTrip(id).then(() => console.log("trip deleted!"));
      onDelete();
      // TODO: make sure image is also deleted from firebase storage
    } catch (error) {
      console.error("Error deleting trip: ", error);
    }
  };

  const handleDeleteStaff = async () => {
    try {
      await deleteStaff(id).then(() => console.log("staff deleted"));
      onDelete();
    } catch (error) {
      console.error("error deleting staff: ", error);
    }
  }

  const handleDelete = async () => {
    switch (deleteType) {
      case "event":
        handleDeleteEvent()
      case "trip":
        handleDeleteTrip()
      case "staff":
        handleDeleteStaff()
    }

  }

  

  return (
    <>
        <AlertDialog.Root>
          <AlertDialog.Trigger asChild>
            <button className={styles.staffButton}>
              <Cross1Icon />
            </button>
          </AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Overlay className={styles.AlertDialogOverlay} />
            <AlertDialog.Content className={styles.AlertDialogContent}>
              <AlertDialog.Title className={styles.AlertDialogTitle}>
                Are you absolutely sure?
              </AlertDialog.Title>
              <AlertDialog.Description
                className={styles.AlertDialogDescription}
              >
                This action cannot be undone. This will permanently this {deleteType} and remove its data from our servers.
              </AlertDialog.Description>
              <div
                style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}
              >
                <AlertDialog.Cancel asChild>
                  <button className={styles.ButtonMauve}>Cancel</button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                  <button className={styles.ButtonRed} onClick={handleDelete}>
                    Yes, delete {deleteType}
                  </button>
                </AlertDialog.Action>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
    </>
  );
};
