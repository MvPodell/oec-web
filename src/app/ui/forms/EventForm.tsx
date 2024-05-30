'use client';
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { addEventToFirestore } from "@/config/firestore";
import styles from "@/app/ui/forms/forms.module.scss";
import Link from "next/link";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";



export interface EventFormProps {
    date: string;
    description: string;
    id: string;
    imageURL: string;
    location: string;
    title: string;
};

export const EventForm = () => {
    const [eventDetails, seteventDetails] = useState<EventFormProps>({
        date: "",
        description: "",
        id: "",
        imageURL: "",
        location: "",
        title: "",
    });

    
    const eventTitleRef = useRef<HTMLInputElement>(null);
    const eventDateRef = useRef("");
    const eventIdRef = useRef("");
    const eventLocationRef = useRef("");
    const eventDescRef = useRef("");
    const eventImageRef = useRef<HTMLInputElement>(null);
    


    const [notice, setNotice] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const file = eventImageRef.current?.files?.[0];
        let imageUrl = "";
        console.log("image: ", file);
        if (file) {
            const storageRef = ref(storage, `/images/events/${file.name}`);
            await uploadBytes(storageRef, file).then(data => {
                console.log(data, "imgs");
            });
            console.log("image uploaded!");
            imageUrl = await getDownloadURL(storageRef);
        }

        try {
            await addEventToFirestore(
                eventDateRef.current,
                eventDescRef.current,
                eventIdRef.current,
                imageUrl,
                eventLocationRef.current,
                eventTitleRef.current?.value || "",
            );
            console.log("Added event to firestore!");
            router.push('/dashboard');
        } catch (error) {
            console.error("Error adding event to firestore: ", error)
        }
    }

    return (
        <div className={styles.formModule}>
            <div className={styles.formHeaderContainer}>
                <div className={styles.formBackContainer}>
                    <Link className={styles.formBackButton} href="/dashboard">Back to Dashboard</Link>
                </div>
                <div className={styles.formHeader}>
                    Create an event
                </div>
            </div>
            <div className={styles.formFieldsContainer}>
                <form className={styles.formFields} onSubmit={handleSubmit}>
                    {"" !== notice &&
                        <div className="alert alert-warning" role="alert">
                            {notice}
                        </div>
                    }
                    <div className={styles.formInputContainer}>
                        <label htmlFor="eventTitle" className={styles.formLabel}> Event Title</label>
                        <input 
                            id="eventTitle" 
                            className={styles.formInput} 
                            placeholder="Title" 
                            ref={eventTitleRef}
                        ></input>
                    </div>
                    <div className={styles.formInputContainer}>
                        <label htmlFor="eventDate" className={styles.formLabel}>Event Date</label>
                        <input 
                            id="eventDate" 
                            className={styles.formInput} 
                            placeholder="Date" 
                            onChange={(e) => eventDateRef.current = e.target.value}
                            >

                            </input>
                    </div>
                    <div className={styles.formInputContainer}>
                        <label htmlFor="eventId" className={styles.formLabel}>Event ID</label>
                        <input 
                        id="eventId" 
                        className={styles.formInput} 
                        placeholder="ID" 
                        onChange={(e) => eventIdRef.current = e.target.value}
                        >

                        </input>
                    </div>
                    <div className={styles.formInputContainer}>
                        <label htmlFor="eventLocation" className={styles.formLabel}>Event Location</label>
                        <input 
                            id="eventLocation" 
                            className={styles.formInput} 
                            placeholder="Location" 
                            onChange={(e) => eventLocationRef.current = e.target.value}
                            >

                            </input>
                    </div>
                    <div className={styles.formInputContainer}>
                        <label htmlFor="eventDesc" className={styles.formLabel}>Event Description</label>
                        <input 
                            id="confirmeventDescPassword" 
                            className={styles.formInput} 
                            placeholder="Long Description" 
                            onChange={(e) => eventDescRef.current = e.target.value}
                            >

                        </input>
                    </div>
                    <div className={styles.formInputContainer}>
                        <label htmlFor="eventImage" className={styles.formLabel}>Image</label>
                        <input 
                            id="eventImage" 
                            type="file" 
                            className={styles.formInput} 
                            placeholder="Image" 
                            ref={eventImageRef}
                            >

                        </input>
                    </div>
                    <div className={styles.formSubmitContainer}>
                        <button type="submit" className={styles.formSubmit} >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


