"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { addEventToFirestore } from "@/config/firestore/eventFirestore";
import styles from "@/app/ui/forms/forms.module.scss";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";

interface EventFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EventForm: React.FC<EventFormProps> = ({ setOpen }) => {
  const eventTitleRef = useRef<HTMLInputElement>(null);
  const eventDateRef = useRef<HTMLInputElement>(null);
  const eventLocationRef = useRef<HTMLInputElement>(null);
  const eventDescRef = useRef<HTMLTextAreaElement>(null);
  const eventImageRef = useRef<HTMLInputElement>(null);
  const eventId = Math.random().toString(16);

  const router = useRouter();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const file = eventImageRef.current?.files?.[0];
    let imageUrl = "";
    if (file) {
      const storageRef = ref(storage, `/images/events/${file.name}`);
      await uploadBytes(storageRef, file).then((data) => {
        console.log(data, "imgs");
      });
      console.log("image uploaded!");
      imageUrl = await getDownloadURL(storageRef);
    }
    try {
      await addEventToFirestore(
        eventDateRef.current?.value || "",
        eventDescRef.current?.value || "",
        eventId,
        imageUrl,
        eventLocationRef.current?.value || "",
        eventTitleRef.current?.value || ""
      );
      setOpen(false);
      console.log("Added event to firestore!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error adding event to firestore: ", error);
    }
  };

  return (
    <div className={styles.formModule}>
      <div className={styles.formHeaderContainer}>
        <div className={styles.formHeader}>Create an event</div>
      </div>
      <div className={styles.formFieldsContainer}>
        <form className={styles.formFields} >
          <div className={styles.formInputContainer}>
            <label htmlFor="eventTitle" className={styles.formLabel}>
              Event Title
            </label>
            <input
              id="eventTitle"
              className={styles.formInput}
              placeholder="Title"
              ref={eventTitleRef}
            ></input>
          </div>
          <div className={styles.formInputContainer}>
            <label htmlFor="eventDate" className={styles.formLabel}>
              Event Date
            </label>
            <input
              id="eventDate"
              type="date"
              className={styles.formInput}
              placeholder="Date"
              ref={eventDateRef}
            ></input>
          </div>
          <div className={styles.formInputContainer}>
            <label htmlFor="eventLocation" className={styles.formLabel}>
              Event Location
            </label>
            <input
              id="eventLocation"
              className={styles.formInput}
              placeholder="Location"
              ref={eventLocationRef}
            ></input>
          </div>
          <div className={styles.formInputContainer}>
            <label htmlFor="eventDesc" className={styles.formLabel}>
              Event Description
            </label>
            <textarea
              rows={4}
              id="confirmeventDescPassword"
              className={styles.formInput}
              placeholder="Long Description"
              ref={eventDescRef}
            ></textarea>
          </div>
          <div className={styles.formInputContainer}>
            <label htmlFor="eventImage" className={styles.formLabel}>
              Image
            </label>
            <div className={styles.sublabel}>
              Please select a high-quality, <b>horizontal</b> photo.{" "}
            </div>
            <input
              id="eventImage"
              type="file"
              className={styles.formInput}
              placeholder="Image"
              ref={eventImageRef}
            ></input>
          </div>
        </form>
      </div>
      <div className={styles.formSubmitContainer}>
        <button type="submit" className={styles.ButtonBlue} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};
