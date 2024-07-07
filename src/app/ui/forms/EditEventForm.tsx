"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import * as Form from "@radix-ui/react-form";
import styles from "@/app/ui/forms/forms.module.scss";
import { Event } from "@/app/dashboard/page";
import { getEvent, updateEvent } from "@/config/firestore/eventFirestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";

interface EditEventFormProps {
  eventId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onEdit: () => void;
}

export const EditEventForm: React.FC<EditEventFormProps> = ({
  eventId,
  setOpen,
  onEdit,
}) => {
  const [eventData, setEventData] = useState<Event>({
    date: "",
    description: "",
    id: "",
    imageURL: "",
    key: "",
    location: "",
    title: "",
  });
  const [updatedEvent, setUpdatedEvent] = useState<Event>({
    date: "",
    description: "",
    id: "",
    imageURL: "",
    key: "",
    location: "",
    title: "",
  });
  const dateInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const fetchEvent = useCallback(async () => {
    const fetchEventData = async () => {
      if (eventId) {
        const data = await getEvent(eventId);
        if (data) {
          setEventData(data);
        }
      }
    };
    fetchEventData();
  }, [eventId]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.value = eventData.title || "";
    }
    if (dateInputRef.current) {
      dateInputRef.current.value = eventData.date || "";
    }
    if (descriptionInputRef.current) {
      descriptionInputRef.current.value = eventData.description || "";
    }
    if (locationInputRef.current) {
      locationInputRef.current.value = eventData.location || "";
    }
  }, [
    eventData.title,
    eventData.date,
    eventData.location,
    eventData.description,
  ]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setUpdatedEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setUpdatedEvent((prevState) => ({
        ...prevState,
        imageURL: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const file = imageInputRef.current?.files?.[0];
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
      await updateEvent(
        dateInputRef.current?.value || "",
        descriptionInputRef.current?.value || "",
        eventData.id,
        imageUrl || eventData.imageURL,
        locationInputRef.current?.value || "",
        titleInputRef.current?.value || ""
      );
      setOpen(false);
      onEdit();
    } catch (error) {
      console.error("Error adding event to firestore: ", error);
    }
  };

  return (
    <Form.Root className={styles.FormRoot}>
      <Form.Field className={styles.FormField} name="title">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className={styles.FormLabel}>Event Title</Form.Label>
        </div>
        <Form.Control asChild>
          <input
            ref={titleInputRef}
            className={styles.Input}
            type="text"
            required
            onChange={handleChange}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className={styles.FormField} name="date">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className={styles.FormLabel}>Date</Form.Label>
        </div>
        <Form.Control asChild>
          <input
            ref={dateInputRef}
            className={styles.Input}
            type="date"
            required
            onChange={handleChange}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className={styles.FormField} name="date">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className={styles.FormLabel}>Location</Form.Label>
        </div>
        <Form.Control asChild>
          <input
            ref={locationInputRef}
            className={styles.Input}
            type="text"
            required
            onChange={handleChange}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className={styles.FormField} name="description">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className={styles.FormLabel}>Description</Form.Label>
        </div>
        <Form.Control asChild>
          <textarea
            ref={descriptionInputRef}
            className={styles.Textarea}
            required
            onChange={handleChange}
          />
        </Form.Control>
      </Form.Field>
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
            onChange={handleFileChange}
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button className={styles.ButtonBlue} onClick={handleSubmit}>
          Submit edits
        </button>
      </Form.Submit>
    </Form.Root>
  );
};
