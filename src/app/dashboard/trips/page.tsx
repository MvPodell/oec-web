import React from "react";
import styles from "@/app/ui/trips/trips.module.scss";
import { TripList } from "@/app/ui/trips/TripList";
import { AddButton } from "@/app/ui/buttons/AddButton";

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
            <AddButton label="ADD TRIP" dest="/form/add-trip"/>
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