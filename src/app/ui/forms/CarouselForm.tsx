"use client";
import React, { useRef } from "react";
import styles from "@/app/ui/forms/forms.module.scss";
import { addCarouselImage } from "@/config/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";

interface CarouselFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CarouselForm: React.FC<CarouselFormProps> = ({ setOpen }) => {
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
      await addCarouselImage(imageUrl);
      setOpen(false);
    } catch (error) {
      console.error("Error adding carousel image to firestore: ", error);
    }
  };

  return (
    <form className={styles.FormRoot}>
      <div className={styles.formHeaderContainer}>
        <div className={styles.formHeader}>Add Image to Carousel</div>
      </div>
      <div className={styles.formFieldsContainer}>
        <div className={styles.formFields}>
          <div className={styles.formInputContainer}>
            <input
              ref={imageInputRef}
              className={styles.formInput}
              type="file"
              required
            />
          </div>
        </div>
      </div>
      <div className={styles.formSubmitContainer}>
        <button className={styles.ButtonBlue} onClick={handleSubmit}>
          Submit image
        </button>
      </div>
    </form>
  );
};
