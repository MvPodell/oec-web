import React from "react";
import * as Form from "@radix-ui/react-form";
import styles from "@/app/ui/forms/forms.module.scss";

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

interface EditEventFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditEventForm: React.FC<EditEventFormProps> = ({ setOpen }) => {
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
          <input className={styles.Input} type="text" required />
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
          <input className={styles.Input} type="date" required />
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
          <input className={styles.Input} type="text" required />
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
          <textarea className={styles.Textarea} required />
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
          <input className={styles.Input} type="file" required />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button
          className={styles.ButtonBlue}
          onSubmit={(event) => {
            wait().then(() => setOpen(false));
            event.preventDefault();
          }}
        >
          Submit edits
        </button>
      </Form.Submit>
    </Form.Root>
  );
};
