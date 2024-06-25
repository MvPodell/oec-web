'use client';
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { addTripToFirestore } from "@/config/firestore";
import styles from "@/app/ui/forms/forms.module.scss";
import Link from "next/link";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";



export interface TripFormProps {
    capacity: string;
    date: string;
    description: string;
    id: string;
    imageURL: string;
    shortDescription: string;
    title: string;
};

export const TripForm = () => {
    const [tripDetails, setTripDetails] = useState<TripFormProps>({
        capacity: "",
        date: "",
        description: "",
        id: "",
        imageURL: "",
        shortDescription: "",
        title: "",
    });
    
    // const [tripTitle, setTripTitle] = useState("");
    // const [tripDate, setTripDate] = useState("");
    // const [tripId, setTripId] = useState("");
    // const [tripCapacity, setTripCapacity] = useState("");
    // const [tripShortDesc, setTripShortDesc] = useState("");
    // const [tripDesc, setTripDesc] = useState("");
    // const [tripImage, setTripImage] = useState("");
    
    const tripTitleRef = useRef<HTMLInputElement>(null);
    const tripDateRef = useRef("");
    const tripIdRef = useRef("");
    const tripCapacityRef = useRef("");
    const tripShortDescRef = useRef("");
    const tripDescRef = useRef("");
    const tripImageRef = useRef<HTMLInputElement>(null);
    


    const [notice, setNotice] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const file = tripImageRef.current?.files?.[0];
        let imageUrl = "";
        console.log("image: ", file);
        if (file) {
            const storageRef = ref(storage, `/images/${file.name}`);
            await uploadBytes(storageRef, file).then(data => {
                console.log(data, "imgs");
            });
            console.log("image uploaded!");
            imageUrl = await getDownloadURL(storageRef);
        }

        try {
            await addTripToFirestore(
                tripCapacityRef.current,
                tripDateRef.current,
                tripDescRef.current,
                tripIdRef.current,
                imageUrl,
                tripShortDescRef.current,
                tripTitleRef.current?.value || "",
            );
            console.log("Added trip to firestore!");
            router.push('/dashboard/trips');
        } catch (error) {
            console.error("Error adding trip to firestore: ", error)
        }
    }

    return (
        <div className={styles.formModule}>
            <div className={styles.formHeaderContainer}>
                <div className={styles.formBackContainer}>
                    <Link className={styles.formBackButton} href="/dashboard">Back to Dashboard</Link>
                </div>
                <div className={styles.formHeader}>
                    Create a trip
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
                        <label htmlFor="tripTitle" className={styles.formLabel}> Trip Title</label>
                        <input 
                            id="tripTitle" 
                            className={styles.formInput} 
                            placeholder="Title" 
                            ref={tripTitleRef}
                        ></input>
                    </div>
                    <div className={styles.formInputContainer}>
                        <label htmlFor="tripDate" className={styles.formLabel}>Trip Date</label>
                        <input 
                            id="tripDate" 
                            className={styles.formInput} 
                            placeholder="Date" 
                            type="date"
                            onChange={(e) => tripDateRef.current = e.target.value}
                            >

                            </input>
                    </div>
                    <div className={styles.formInputContainer}>
                        <label htmlFor="tripId" className={styles.formLabel}>Trip ID</label>
                        <div className={styles.sublabel}>Like a username for your trip!</div>
                        <input 
                        id="tripId" 
                        className={styles.formInput} 
                        placeholder="ID" 
                        onChange={(e) => tripIdRef.current = e.target.value}
                        >

                        </input>
                    </div>
                    <div className={styles.formInputContainer}>
                        <label htmlFor="tripCapacity" className={styles.formLabel}>Trip Capacity</label>
                        <div className={styles.sublabel}>How many people can you bring?</div>
                        <input 
                            id="tripCapacity" 
                            className={styles.formInput} 
                            aria-describedby="emailHelp" 
                            placeholder="Capacity" 
                            onChange={(e) => tripCapacityRef.current = e.target.value}
                            >

                            </input>
                    </div>
                    <div className={styles.formInputContainer}>
                        <label htmlFor="tripShortDesc" className={styles.formLabel}>Trip Short Description</label>
                        <div className={styles.sublabel}>One sentence, please!</div>
                        <input 
                            id="tripShortDesc" 
                            className={styles.formInput} 
                            placeholder="Short Description" 
                            onChange={(e) => tripShortDescRef.current = e.target.value}
                            >

                            </input>
                    </div>
                    <div className={styles.formInputContainer}>
                        <label htmlFor="tripDesc" className={styles.formLabel}>Trip Description</label>
                        <div className={styles.sublabel}>Longer description</div>
                        <textarea 
                            rows={4}
                            id="confirmtripDescPassword" 
                            className={styles.formInput} 
                            placeholder="Long Description" 
                            onChange={(e) => tripDescRef.current = e.target.value}
                            >
                        </textarea>
                    </div>
                    <div className={styles.formInputContainer}>
                        <label htmlFor="tripImage" className={styles.formLabel}>Image</label>
                        <div className={styles.sublabel}>Please select a high-quality, <b>horizontal</b> photo. </div>
                        <input 
                            id="tripImage" 
                            type="file" 
                            className={styles.formInput} 
                            placeholder="Image" 
                            ref={tripImageRef}
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


