"use client";
import React from "react";
import { Pencil1Icon, Cross1Icon } from "@radix-ui/react-icons";
import styles from "@/app/ui/buttons/dialogButton.module.scss";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { CarouselForm } from '../forms/CarouselForm';

export const CarouselButton: React.FC = ({
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
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
                {`Edit`}
              </AlertDialog.Title>
              <AlertDialog.Description
                className={styles.AlertDialogDescription}
              >
                Add images to carousel.
              </AlertDialog.Description>

                <CarouselForm setOpen={setOpen} />
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
};
