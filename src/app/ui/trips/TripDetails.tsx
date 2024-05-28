'use client';
import React from "react";
import styles from "@/app/ui/trips/trips.module.scss";
import Link from "next/link";
import Image from "next/image";
import { Trip } from "@/app/dashboard/trips/page";
import {auth} from "@/config/firebaseConfig";
import { updateTripFromFirestore } from "@/config/firestore";

export const TripDetails: React.FC<Trip> = ({title, id, date, description, image}) => {

    const user = auth.currentUser;
    const joinTrip = async(e: React.MouseEvent) => {
        e.preventDefault();

        if (user) {
            await updateTripFromFirestore(id, user.uid);
            console.log("user added to firestore trip doc");
        } else {
            alert("Please login to join this trip.");
        }

    };

    return (
        <div className={styles.tripDetailsContainer}>
            <div className={styles.backButtonContainer}>
                <div className={styles.cardButtonContainer}>
                    <Link
                        key="backArrow"
                        href={"/dashboard/trips"}
                        className={styles.cardButton}>
                        Back to Trips
                    </Link>
                </div>
                </div>
            <div className={styles.card}>
                    <Image className={styles.tripDetailsImage} src={`/images/${image}.jpeg`} alt="Joshua Tree" width="800" height="200" />
                <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                        {title}
                        <div className={styles.cardButtonContainer}>
                            <button className={styles.joinButton} onClick={(e) => joinTrip(e)}>
                                JOIN
                            </button>
                        </div>
                    </div>
                    <div className={styles.cardDate}>{date}</div>
                    <div className={styles.cardText}>{description}</div>
                </div>
            </div>
        </div>
    )
}