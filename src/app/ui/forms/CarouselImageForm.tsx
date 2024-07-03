"use client";
import React, { useRef } from "react";
import * as Form from "@radix-ui/react-form";
import styles from "@/app/ui/forms/forms.module.scss";
import { addCarouselImage } from "@/config/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";

interface CarouselFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   onEdit: () => void;
}

export const CarouselForm: React.FC<CarouselFormProps> = ({
  setOpen,
//   onEdit,
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const file = imageInputRef.current?.files?.[0];
    let imageUrl = "";
    if (file) {
      const storageRef = ref(storage, `/images/carousel/${file.name}`);
      await uploadBytes(storageRef, file).then((data) => {
        console.log(data, "imgs");
      });
      console.log("image uploaded!");
      imageUrl = await getDownloadURL(storageRef);
    }

    try {
      await addCarouselImage(
        imageUrl,
      );
      setOpen(false);
    } catch (error) {
      console.error("Error adding carousel image to firestore: ", error);
    }
  };

  return (
    <Form.Root className={styles.FormRoot}>
      <Form.Field className={styles.FormField} name="image">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className={styles.FormLabel}>Image</Form.Label>
        </div>
        <Form.Control asChild>
          <input
            ref={imageInputRef}
            className={styles.Input}
            type="file"
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button className={styles.ButtonBlue} onClick={handleSubmit}>
          Submit image
        </button>
      </Form.Submit>
    </Form.Root>
  );
};
