import React from "react";
import styles from "@/app/ui/trips/trips.module.scss";
import { TripList } from "@/app/ui/trips/TripList";
import { StaffButton } from "@/app/ui/trips/StaffButton";

export interface Trip {
    capacity: string;
    date: string;
    description: string;
    id: string;
    imageURL: string;
    key: string;
    members: string[];
    shortDescription: string;
    title: string;
};

export default function Page() {

    return (
        <div className={styles.tripsContainer}>
            <StaffButton label="Add Trip" dest="/form/add-trip"/>
            <div className={styles.currentTripsSection}>
                <div className={styles.sectionHeader}>Current Trips</div>
                <div className={styles.deckContainer}> 
                    <TripList kind="present"/>
                </div>
                
            </div>
            <div className={styles.pastTripsSection}>
                <div className={styles.sectionHeader}>Past Trips</div>
                <div className={styles.deckContainer}> 
                    <TripList kind="past" />
                </div>
            </div>
            
        </div>
    )
}