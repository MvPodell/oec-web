"use client";
import React from "react";
import { Pencil1Icon, Cross1Icon } from "@radix-ui/react-icons";
import styles from "@/app/ui/buttons/dialogButton.module.scss";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { EditEventForm } from "../forms/EditEventForm";
import { EditTripForm } from "../forms/EditTripForm";
import { EditStaffForm } from "../forms/EditStaffForm";
import { EditCarouselForm } from "../forms/EditCarouselForm";
import { CarouselObj } from "../dashboard/carousel/Carousel";
import { TrashIcon, EyeOpenIcon } from "@radix-ui/react-icons";


interface EditButtonProps {
  editType: "event" | "trip" | "staff" | "carousel";
  id?: string;
  onEdit: () => void;
  carousel?: CarouselObj;
}

export const EditButton: React.FC<EditButtonProps> = ({
  editType,
  id,
  onEdit,
  carousel
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
                {`Edit ${editType}`}
              </AlertDialog.Title>
              <AlertDialog.Description
                className={styles.AlertDialogDescription}
              >
                {editType != "carousel" && (
                  `This action cannot be undone. This will permanently edit this ${editType}.`
                )}
                {editType === "carousel" && (
                  <span>Use <TrashIcon /> column to select which images to permanently delete. Use <EyeOpenIcon /> column to select which images to set as visible.</span>
                  
                )}
                
              </AlertDialog.Description>

              {editType === "event" && id && (
                <EditEventForm eventId={id} setOpen={setOpen} onEdit={onEdit} />
              )}
              {editType === "trip" && id && (
                <EditTripForm tripId={id} setOpen={setOpen} onEdit={onEdit} />
              )}
              {editType === "staff" && id && (
                <EditStaffForm staffId={id} setOpen={setOpen} onEdit={onEdit} />
              )}
              {editType === "carousel" && carousel && (
                <EditCarouselForm carousel={carousel} setOpen={setOpen} onEdit={onEdit} />
              )}
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
};
