'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addTripToFirestore } from "@/config/firestore";
import styles from "@/app/ui/forms/forms.module.scss";
import Link from "next/link";


export interface TripFormProps {
    capacity: string;
    date: string;
    description: string;
    id: string;
    image: string;
    shortDescription: string;
    title: string;
};

export const TripForm = () => {
    const [tripDetails, setTripDetails] = useState<TripFormProps>({
        capacity: "",
        date: "",
        description: "",
        id: "",
        image: "",
        shortDescription: "",
        title: "",
    });

    const [tripTitle, setTripTitle] = useState("");
    const [tripDate, setTripDate] = useState("");
    const [tripId, setTripId] = useState("");
    const [tripCapacity, setTripCapacity] = useState("");
    const [tripShortDesc, setTripShortDesc] = useState("");
    const [tripDesc, setTripDesc] = useState("");
    const [tripImage, setTripImage] = useState("");
    


    const [notice, setNotice] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await addTripToFirestore(tripCapacity, tripDate, tripDesc, tripId, tripImage, tripShortDesc, tripTitle);
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
                    <Link className={styles.formBackButton} href="/dashboard/trips">Back to Trips</Link>
                </div>
                <div className={styles.formHeader}>
                    Create a trip
                </div>
            </div>
            <div className={styles.formFieldsContainer}>
                <form className={styles.formFields}>
                    {"" !== notice &&
                        <div className="alert alert-warning" role="alert">
                            {notice}
                        </div>
                    }
                    <div className={styles.formInputContainer}>
                        <label htmlFor="tripTitle" className={styles.formLabel}> Trip Title</label>
                        <input id="tripTitle" className={styles.formInput} placeholder="Title" value={tripTitle} onChange={(e) => setTripTitle(e.target.value)}></input>
                    </div>
                    <div className={styles.formInputContainer}>
                        <label htmlFor="tripDate" className={styles.formLabel}>Trip Date</label>
                        <input id="tripDate" className={styles.formInput} placeholder="Date" value={tripDate} onChange={(e) => setTripDate(e.target.value)}></input>
                    </div>
                    <div className={styles.formInputContainer}>
                        <label htmlFor="tripId" className={styles.formLabel}>Trip ID</label>
                        <input id="tripId" className={styles.formInput} placeholder="ID" value={tripId} onChange={(e) => setTripId(e.target.value)}></input>
                    </div>
                    <div className={styles.formInputContainer}>
                        <label htmlFor="tripCapacity" className={styles.formLabel}>Trip Capacity</label>
                        <input id="tripCapacity" className={styles.formInput} aria-describedby="emailHelp" placeholder="Capacity" value={tripCapacity} onChange={(e) => setTripCapacity(e.target.value)}></input>
                    </div>
                    <div className={styles.formInputContainer}>
                        <label htmlFor="tripShortDesc" className={styles.formLabel}>Trip Short Description</label>
                        <input id="tripShortDesc" className={styles.formInput} placeholder="Short Description" value={tripShortDesc} onChange={(e) => setTripShortDesc(e.target.value)}></input>
                    </div>
                    <div className={styles.formInputContainer}>
                        <label htmlFor="tripDesc" className={styles.formLabel}>Trip Description</label>
                        <input id="confirmtripDescPassword" className={styles.formInput} placeholder="Long Description" value={tripDesc} onChange={(e) => setTripDesc(e.target.value)}></input>
                    </div>
                    <div className={styles.formInputContainer}>
                        <label htmlFor="tripImage" className={styles.formLabel}>Image</label>
                        <input id="tripImage" className={styles.formInput} placeholder="Image" value={tripImage} onChange={(e) => setTripImage(e.target.value)}></input>
                    </div>
                    <div className={styles.formSubmitContainer}>
                        <button type="submit" className={styles.formSubmit} onClick={(e)=> handleSubmit(e)}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


