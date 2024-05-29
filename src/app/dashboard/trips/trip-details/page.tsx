import React from "react";
import Link from "next/link";
import styles from "@/app/ui/trips/trips.module.scss";
import { TripDetails } from "@/app/ui/trips/TripDetails";
import { Trip } from "@/app/dashboard/trips/page";

export default function Page() { 
    return (
        <div className={styles.tripDetails}>
            <TripDetails />
        </div>
    )
}