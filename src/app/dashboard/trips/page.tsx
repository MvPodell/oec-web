import React from "react";
import styles from "@/app/ui/trips/trips.module.scss";
import { TripCard } from "@/app/ui/trips/TripCard";
import { TripList } from "@/app/ui/trips/TripList";

export interface Trip {
    capacity: string;
    date: string;
    description: string;
    id: string;
    image: string;
    key: string;
    members: string[];
    shortDescription: string;
    title: string;
};

export default function Page() {


    return (
        <div className={styles.tripsContainer}>
            <div className={styles.currentTripsSection}>
                <div className={styles.sectionHeader}>Current Trips</div>
                <div className={styles.deckContainer}> 
                    <TripList />
                </div>
                
            </div>
            <div className={styles.pastTripsSection}>
                <div className={styles.sectionHeader}>Past Trips</div>
                <div className={styles.deckContainer}> 
                    <TripList />
                </div>
            </div>
            
        </div>
    )
}