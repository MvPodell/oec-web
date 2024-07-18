'use client';
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { addTripToFirestore } from "@/config/firestore/tripFirestore";
import styles from "@/app/ui/forms/forms.module.scss";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";

export interface TripFormProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;

};

export const TripForm: React.FC<TripFormProps> = ({setOpen}) => {
    
    const tripTitleRef = useRef<HTMLInputElement>(null);
    const tripDateRef = useRef("");
    const tripCapacityRef = useRef("");
    const tripShortDescRef = useRef("");
    const tripDescRef = useRef("");
    const tripImageRef = useRef<HTMLInputElement>(null);
    const tripId = Math.random().toString(16);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const file = tripImageRef.current?.files?.[0];
        let imageUrl = "";
        console.log("image: ", file);
        if (file) {
            const storageRef = ref(storage, `/images/trips/${file.name}`);
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
                tripId,
                imageUrl,
                tripShortDescRef.current,
                tripTitleRef.current?.value || "",
            );
            setOpen(false);
            console.log("Added trip to firestore!");
            router.push('/dashboard/trips');
        } catch (error) {
            console.error("Error adding trip to firestore: ", error)
        }
    }

    return (
        <div className={styles.formModule}>
            <div className={styles.formHeaderContainer}>
                <div className={styles.formHeader}>
                    Create a trip
                </div>
            </div>
            <div className={styles.formFieldsContainer}>
                <form className={styles.formFields} onSubmit={handleSubmit}>
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
                        <label htmlFor="tripShortDesc" className={styles.formLabel}>Blurb</label>
                        <div className={styles.sublabel}>One sentence describing the trip</div>
                        <input 
                            id="tripShortDesc" 
                            className={styles.formInput} 
                            placeholder="Short Description" 
                            onChange={(e) => tripShortDescRef.current = e.target.value}
                            >

                            </input>
                    </div>
                    <div className={styles.formInputContainer}>
                        <label htmlFor="tripDesc" className={styles.formLabel}>Description</label>
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
                        <button type="submit" className={styles.ButtonBlue} >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


