import React from "react";
import Link from "next/link";
import styles from "@/app/ui/trips/trips.module.scss";
import { EventDetails } from "@/app/ui/dashboard/EventDetails";

export default function Page() { 
    return (
        <div className={styles.tripDetails}>
            <EventDetails />
        </div>
    )
}