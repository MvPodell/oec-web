import React, { Suspense } from "react";
import styles from "@/app/ui/trips/trips.module.scss";
import { EventDetails } from "@/app/ui/cards/EventDetails";

export default function Page() { 
    return (
        <div className={styles.tripDetails}>
            <Suspense fallback={<div>Loading...</div>}>
                <EventDetails />
            </Suspense>
        </div>
    )
}