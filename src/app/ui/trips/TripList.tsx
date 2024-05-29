'use client';
import React, { useEffect, useState } from "react";
import { getTripList } from "@/config/firestore";
import { TripCard } from "@/app/ui/trips/TripCard";
import styles from "@/app/ui/trips/trips.module.scss";
import { Trip } from "@/app/dashboard/trips/page";

export const TripList = () => {
    const [trips, setTrips] = useState<Trip[]>([]);

    useEffect(() => {
        const fetchTrips = async () => {
            const tripData = await getTripList();
            setTrips(tripData);
        };
        fetchTrips();
    }, []);

    return (
        <div className={styles.tripListContainer}>
            {trips.map(trip => (
                <TripCard 
                    id={trip.id}
                    title={trip.title}
                    date={trip.date}
                    shortDescription={trip.shortDescription}
                    image={trip.image}
                />
            ))}
        </div>
    );
}