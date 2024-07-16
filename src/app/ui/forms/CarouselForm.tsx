"use client";
import React, { useRef } from "react";
import styles from "@/app/ui/forms/forms.module.scss";
import { addCarouselImage } from "@/config/firestore/carouselFirestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";

interface CarouselFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function getFileType(file: File) {
  const fileTypeRegex = /([^/]+)$/;
  let fileType = "";
  if (file.type) {
    const match = fileTypeRegex.exec(file.type);
    if (match) {
      fileType = match[0];
    }
  }
  return fileType;
}

export const CarouselForm: React.FC<CarouselFormProps> = ({ setOpen }) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const file = imageInputRef.current?.files?.[0];

    try {
      if (file) {
        const fileType = getFileType(file);
        const imageName =
          `${nameInputRef.current?.value}.${fileType}` || file.name;
        let imageUrl = "";
        const storageRef = ref(storage, `/images/carousel/${imageName}`);
        await uploadBytes(storageRef, file);
        console.log("image uploaded!");
        imageUrl = await getDownloadURL(storageRef);

        await addCarouselImage({
          imageUrl: imageUrl,
          imageName: imageName,
          visible: true,
        });
        setOpen(false);
      }
    } catch (error) {
      console.error("Error adding carousel image to firestore: ", error);
    }
  };

  return (
    <div className={styles.formModule}>
      <div className={styles.formHeaderContainer}>
        <div className={styles.formHeader}>Add Image to Carousel</div>
      </div>
      <div className={styles.formFieldsContainer}>
        <form className={styles.formFields}>
          <div className={styles.formInputContainer}>
            <label>Descriptive File Name</label>
            <input
              ref={nameInputRef}
              className={styles.formInput}
              type="text"
              placeholder="ex. GrandCanyon2024.jpeg"
              required
            />
          </div>
          <div className={styles.formInputContainer}>
            <label>Image</label>
            <input
              ref={imageInputRef}
              className={styles.formInput}
              type="file"
              required
            />
          </div>
        </form>
      </div>
      <div className={styles.formSubmitContainer}>
        <button type="submit" className={styles.ButtonBlue} onClick={handleSubmit}>
          Submit image
        </button>
      </div>
    </div>
  );
};
