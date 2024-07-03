"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import * as Form from "@radix-ui/react-form";
import styles from "@/app/ui/forms/forms.module.scss";
import { Member } from "../about/StaffSection";
import { getStaff, updateStaff } from "@/config/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";

interface EditStaffFormProps {
  staffId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onEdit: () => void;
}

export const EditStaffForm: React.FC<EditStaffFormProps> = ({
  staffId,
  setOpen,
  onEdit,
}) => {
  const [staffData, setStaffData] = useState<Member>({
    name: "",
    id: "",
    role: "Staff",
    hometown: "",
    hireDate: "",
    hopes: "",
    graduated: false,
    imageURL: "",
  });
  const nameInputRef = useRef<HTMLInputElement>(null);
  const roleInputRef = useRef<HTMLInputElement>(null);
  const hometownInputRef = useRef<HTMLInputElement>(null);
  const hireInputRef = useRef<HTMLInputElement>(null);
  const hopesInputRef = useRef<HTMLInputElement>(null);
  const gradInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const fetchStaff = useCallback(async () => {
    const fetchStaffData = async () => {
      if (staffId) {
        console.log("fetch staff data for staff member: ", staffId);
        const data = await getStaff(staffId);
        if (data) {
          setStaffData(data);
        }
      }
    };
    fetchStaffData();
    console.log("staff data fetched! ", staffData);
  }, [staffId, staffData]);

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.value = staffData.name || "";
    }
    if (hometownInputRef.current) {
      hometownInputRef.current.value = staffData.hometown || "";
    }
    if (hireInputRef.current) {
      hireInputRef.current.value = staffData.hireDate || "";
    }
    if (hopesInputRef.current) {
      hopesInputRef.current.value = staffData.hopes || "";
    }
    if (gradInputRef.current) {
      gradInputRef.current.checked = staffData.graduated || false;
    }
  }, [
    staffData.name,
    staffData.role,
    staffData.hometown,
    staffData.hireDate,
    staffData.hopes,
    staffData.graduated,
  ]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const file = imageInputRef.current?.files?.[0];
    let imageUrl = "";
    if (file) {
      const storageRef = ref(storage, `/images/staff/${file.name}`);
      await uploadBytes(storageRef, file);
      console.log("image uploaded!");
      imageUrl = await getDownloadURL(storageRef);
    }

    try {
      // console.log("staffId in editstaffform: ", staffId);
      await updateStaff(
        nameInputRef.current?.value || "",
        staffId,
        staffData.role,
        hometownInputRef.current?.value || "",
        hireInputRef.current?.value || "",
        hopesInputRef.current?.value || "",
        gradInputRef.current?.checked || false,
        imageUrl || staffData.imageURL
      );
      setOpen(false);
      onEdit();
    } catch (error) {
      console.error("Error adding Staff to firestore: ", error);
    }
  };

  return (
    <Form.Root className={styles.FormRoot}>
      <Form.Field className={styles.FormField} name="name">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className={styles.FormLabel}>Staff Name</Form.Label>
        </div>
        <Form.Control asChild>
          <input
            ref={nameInputRef}
            className={styles.Input}
            type="text"
            required
            // onChange={handleChange}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className={styles.FormField} name="hometown">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className={styles.FormLabel}>Hometown</Form.Label>
        </div>
        <Form.Control asChild>
          <input
            ref={hometownInputRef}
            className={styles.Input}
            type="text"
            required
            // onChange={handleChange}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className={styles.FormField} name="hireDate">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className={styles.FormLabel}>Tenure Range</Form.Label>
        </div>
        <Form.Control asChild>
          <input
            ref={hireInputRef}
            className={styles.Textarea}
            type="text"
            required
            // onChange={handleChange}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className={styles.FormField} name="hopes">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className={styles.FormLabel}>Hopes and Dreams</Form.Label>
        </div>
        <Form.Control asChild>
          <input
            ref={hopesInputRef}
            className={styles.Input}
            type="text"
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className={styles.FormField} name="graduated">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className={styles.FormLabel}>
            Graduation status (true/false)
          </Form.Label>
        </div>
        <Form.Control asChild>
          <input
            ref={gradInputRef}
            className={styles.Input}
            type="checkbox"
            required
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
            // onChange={handleFileChange}
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
