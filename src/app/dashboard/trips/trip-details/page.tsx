import React, { Suspense } from "react";
import styles from "@/app/ui/trips/trips.module.scss";
import { TripDetails } from "@/app/ui/cards/TripDetails";

export default function Page() { 
    return (
        <div className={styles.tripDetails}>
            <Suspense fallback={<div>Loading...</div>}>
                <TripDetails />
            </Suspense>
        </div>
    )
}