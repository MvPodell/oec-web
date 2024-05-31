import React from "react";
import styles from "@/app/ui/trips/trips.module.scss";
import { TripDetails } from "@/app/ui/cards/TripDetails";

export default function Page() { 
    return (
        <div className={styles.tripDetails}>
            <TripDetails />
        </div>
    )
}