"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import * as Form from "@radix-ui/react-form";
import styles from "@/app/ui/forms/forms.module.scss";
import { getTrip, updateTrip } from "@/config/firestore/tripFirestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";
import { Trip } from "@/app/dashboard/trips/page";

interface EditTripFormProps {
  tripId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onEdit: () => void;
}

export const EditTripForm: React.FC<EditTripFormProps> = ({
  tripId,
  setOpen,
  onEdit,
}) => {
  const [tripData, setTripData] = useState<Trip>({
    date: "",
    description: "",
    capacity: "",
    confirmed: [],
    id: "",
    imageURL: "",
    key: "",
    members: [],
    shortDescription: "",
    title: "",
    
  });
  const [updatedTrip, setUpdatedTrip] = useState<Trip>({
    date: "",
    description: "",
    capacity: "",
    confirmed: [],
    id: "",
    imageURL: "",
    key: "",
    members: [],
    shortDescription: "",
    title: "",
  });
  const dateInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const capacityInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const shortDescInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);



  const fetchEvent = useCallback(async () => {
    const fetchTripData = async () => {
      if (tripId) {
        const data = await getTrip(tripId);
        if (data) {
          setTripData(data);
        }
      }
    };
    fetchTripData();
  }, [tripId]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.value = tripData.title || "";
    }
    if (dateInputRef.current) {
      dateInputRef.current.value = tripData.date || "";
    }
    if (capacityInputRef.current) {
        capacityInputRef.current.value = tripData.capacity || "";
    }
    if (shortDescInputRef.current) {
        shortDescInputRef.current.value = tripData.shortDescription || "";
    }
    if (descriptionInputRef.current) {
      descriptionInputRef.current.value = tripData.description || "";
    }
  }, [
    tripData.title,
    tripData.date,
    tripData.description,
    tripData.capacity,
    tripData.shortDescription,
  ]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setUpdatedTrip((prevState) => ({
      ...prevState,
      [name]: value,
    }));

  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setUpdatedTrip((prevState) => ({
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
        const storageRef = ref(storage, `/images/trips/${file.name}`);
        await uploadBytes(storageRef, file).then(data => {
            console.log(data, "imgs");
        });
        console.log("image uploaded!");
        imageUrl = await getDownloadURL(storageRef);
    }

    try {
        await updateTrip(
            capacityInputRef.current?.value || "",
            dateInputRef.current?.value || "",
            descriptionInputRef.current?.value || "",
            tripData.id,
            imageUrl || tripData.imageURL,
            shortDescInputRef.current?.value || "",
            titleInputRef.current?.value || "",
        );
        setOpen(false);
        onEdit();
    } catch (error) {
        console.error("Error adding event to firestore: ", error)
    }
    
}

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
          <Form.Label className={styles.FormLabel}>Trip Title</Form.Label>
        </div>
        <Form.Control asChild>
          <input ref={titleInputRef} className={styles.Input} type="text" required onChange={handleChange}/>
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
          <input ref={dateInputRef} className={styles.Input} type="date" required onChange={handleChange}/>
        </Form.Control>
      </Form.Field>
      <Form.Field className={styles.FormField} name="capacity">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className={styles.FormLabel}>Capacity</Form.Label>
        </div>
        <Form.Control asChild>
          <input ref={capacityInputRef} className={styles.Input} type="text" required onChange={handleChange}/>
        </Form.Control>
      </Form.Field>
      <Form.Field className={styles.FormField} name="short description">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className={styles.FormLabel}>Short Description</Form.Label>
        </div>
        <Form.Control asChild>
          <input ref={shortDescInputRef} className={styles.Input} type="text" required onChange={handleChange}/>
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
          <textarea ref={descriptionInputRef} className={styles.Textarea} required onChange={handleChange}/>
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
          <input ref={imageInputRef} className={styles.Input} type="file" required onChange={handleFileChange} />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button
          className={styles.ButtonBlue}
          onClick={handleSubmit}
        >
          Submit edits
        </button>
      </Form.Submit>
    </Form.Root>
  );
};
