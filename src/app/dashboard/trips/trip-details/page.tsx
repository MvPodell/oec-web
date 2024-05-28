import React from "react";
import Link from "next/link";
import styles from "@/app/ui/trips/trips.module.scss";
import { TripDetails } from "@/app/ui/trips/TripDetails";
import { Trip } from "@/app/dashboard/trips/page";

export default function Page() {
    
    const tripDetails: Trip = {
        title: "Josua Tree",
        id: "JoshuaTree",
        key: "JoshuaTree",
        date: "March 24th, 2024",
        description: "I am trying my best here. Details Details Details Details Details Details Details",
        image: "JoshuaTree"
    }
    return (
        <div className={styles.tripDetails}>
            <TripDetails title={tripDetails.title} id={tripDetails.id} key={tripDetails.key} date={tripDetails.date} description={tripDetails.description} image={tripDetails.image} />
        </div>
    )
}