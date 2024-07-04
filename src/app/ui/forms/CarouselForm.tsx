"use client";
import React, { useRef } from "react";
import styles from "@/app/ui/forms/forms.module.scss";
import { addCarouselImage } from "@/config/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";

interface CarouselFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CarouselForm: React.FC<CarouselFormProps> = ({
  setOpen,
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
    <form className={styles.FormRoot}>
      <div className={styles.FormField}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <label className={styles.FormLabel}>Image</label>
        </div>
          <input
            ref={imageInputRef}
            className={styles.Input}
            type="file"
            required
          />
      </div>
      <button className={styles.ButtonBlue} onClick={handleSubmit}>
        Submit image
      </button>
    </form>
  );
};
