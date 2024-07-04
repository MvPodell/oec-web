"use client";
import React, { useState, useRef } from "react";
import styles from "@/app/ui/forms/forms.module.scss";
import { useRouter } from "next/navigation";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";
import { addStaffToFirestore } from "@/config/firestore";
import Link from "next/link";

export interface oecStaff {
  name: string;
  id: string;
  role: string;
  Hometown: string;
  hireDate: string;
  hopes: string;
  graduated: boolean;
  imageURL: string;
}

interface StaffFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

}

export const StaffForm: React.FC<StaffFormProps> = ({setOpen}) => {
  const [staff, setStaff] = useState<oecStaff>({
    name: "",
    id: "",
    role: "",
    Hometown: "",
    hireDate: "",
    hopes: "",
    graduated: false,
    imageURL: "",
  });

  const staffNameRef = useRef<HTMLInputElement>(null);
  const staffRoleRef = useRef<HTMLSelectElement>(null);
  const staffHometownRef = useRef<HTMLInputElement>(null);
  const staffHireDateRef = useRef<HTMLInputElement>(null);
  const staffHopesRef = useRef<HTMLInputElement>(null);
  const staffGraduatedRef = useRef<HTMLInputElement>(null);
  const staffImageRef = useRef<HTMLInputElement>(null);
  const staffId = Math.random().toString(16);


  const [notice, setNotice] = useState("");
  const router = useRouter();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;

    if (type == "checkbox") {
      const checked = (event.target as HTMLInputElement).checked;
      setStaff((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setStaff((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const file = staffImageRef.current?.files?.[0];
    let imageUrl = "";
    console.log("image: ", file);
    if (file) {
      const storageRef = ref(storage, `/images/staff/${file.name}`);
      await uploadBytes(storageRef, file);
      console.log("image uploaded!");
      imageUrl = await getDownloadURL(storageRef);
    }

    try {
      await addStaffToFirestore(
        staffNameRef.current?.value || "",
        staffId,
        staffRoleRef.current?.value || "",
        staffHometownRef.current?.value || "",
        staffHireDateRef.current?.value || "",
        staffHopesRef.current?.value || "",
        staffGraduatedRef.current?.checked || false,
        imageUrl
      );
      setOpen(false);
      console.log("Added staff to firestore!");
      router.push("/dashboard/about");
    } catch (error) {
      console.error("Error adding staff to firestore: ", error);
    }
  };

  return (
    <div className={styles.formModule}>
      <div className={styles.formHeaderContainer}>
        {/* <div className={styles.formBackContainer}>
          <Link className={styles.formBackButton} href="/dashboard">
            Back to Dashboard
          </Link>
        </div> */}
        <div className={styles.formHeader}>New Staff Profile</div>
      </div>
      <div className={styles.formFieldsContainer}>
        <form className={styles.formFields} onSubmit={handleSubmit}>
          {"" !== notice && (
            <div className="alert alert-warning" role="alert">
              {notice}
            </div>
          )}
          <div className={styles.formInputContainer}>
            <label htmlFor="staffName" className={styles.formLabel}>
              Name
            </label>
            <input
              id="staffName"
              className={styles.formInput}
              placeholder="Name"
              ref={staffNameRef}
            ></input>
          </div>
          <div className={styles.formInputContainer}>
            <label htmlFor="staffRole" className={styles.formLabel}>
              Role
            </label>
            <select
              id="staffRole"
              className={styles.formInput}
              onChange={handleChange}
              ref={staffRoleRef}
            >
              <option value="Staff">Staff</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          <div className={styles.formInputContainer}>
            <label htmlFor="staffHometown" className={styles.formLabel}>
              Hometown
            </label>
            <input
              id="staffHometown"
              className={styles.formInput}
              placeholder="Hometown"
              onChange={handleChange}
              ref={staffHometownRef}
            ></input>
          </div>
          <div className={styles.formInputContainer}>
            <label htmlFor="staffHireDate" className={styles.formLabel}>
              Tenure
            </label>
            <input
              id="staffHireDate"
              className={styles.formInput}
              type="text"
              onChange={handleChange}
              placeholder="ex. Fall 2021 - Present"
              ref={staffHireDateRef}
            ></input>
          </div>
          <div className={styles.formInputContainer}>
            <label htmlFor="staffGrad" className={styles.formLabel}>
              Has this individual graduated?
            </label>
            <input
              id="staffGrad"
              className={styles.formInput}
              type="checkbox"
              onChange={handleChange}
              ref={staffGraduatedRef}
            ></input>
          </div>
          <div className={styles.formInputContainer}>
            <label htmlFor="staffHopes" className={styles.formLabel}>
              What are your hopes and dreams?
            </label>
            <div className={styles.sublabel}>One sentence, please!</div>
            <input
              id="staffHopes"
              className={styles.formInput}
              placeholder="Hopes and dreams"
              onChange={handleChange}
              ref={staffHopesRef}
            ></input>
          </div>
          <div className={styles.formInputContainer}>
            <label htmlFor="staffImage" className={styles.formLabel}>
              Image
            </label>
            <div className={styles.sublabel}>
              Please select a high-quality, <b>portrait</b> orientation photo.{" "}
            </div>
            <input
              id="staffImage"
              type="file"
              className={styles.formInput}
              placeholder="Image"
              ref={staffImageRef}
            ></input>
          </div>
          <div className={styles.formSubmitContainer}>
            <button type="submit" className={styles.formSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
