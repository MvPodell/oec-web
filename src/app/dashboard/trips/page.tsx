import React from "react";
import styles from "@/app/ui/trips/trips.module.scss";
import { TripCard } from "@/app/ui/trips/TripCard";

export interface Trip {
    key: string;
    title: string;
    date: string;
    description: string;
    image?: string;
};

export default function Page() {
    
    const trips: Trip[] = [
        { 
            key: "JoshuaTree",
            title: "Joshua Tree",
            date: "March 5th, 2024",
            description: "Super beautiful",
            image: "JoshuaTree",
        },
        {
            key: "Yosemite",
            title: "Yosemite",
            date: "March 5th, 2024",
            description: "yahoo!",
            image: "Yosemite",
        }
    ];

    const pastTrips: Trip[] = [
        { 
            key: "JoshuaTree",
            title: "Joshua Tree",
            date: "March 5th, 2024",
            description: "Super beautiful",
        },
        {
            key: "Yosemite",
            title: "Yosemite",
            date: "March 5th, 2024",
            description: "yahoo!"
        },
        { 
            key: "JoshuaTree",
            title: "Joshua Tree",
            date: "March 5th, 2024",
            description: "Super beautiful",
        },
        {
            key: "Yosemite",
            title: "Yosemite",
            date: "March 5th, 2024",
            description: "yahoo!"
        },
        { 
            key: "JoshuaTree",
            title: "Joshua Tree",
            date: "March 5th, 2024",
            description: "Super beautiful",
        },
        {
            key: "Yosemite",
            title: "Yosemite",
            date: "March 5th, 2024",
            description: "yahoo!"
        }
    ]

    return (
        <div className={styles.tripsContainer}>
            <div className={styles.currentTripsSection}>
                <div className={styles.sectionHeader}>Current Trips</div>
                <div className={styles.deckContainer}> 
                    {trips.map((trip) => (
                        <TripCard key={trip.key} title={trip.title} date={trip.date} description={trip.description} image={trip.image}/>
                    ))}
                </div>
                
            </div>
            <div className={styles.pastTripsSection}>
                <div className={styles.sectionHeader}>Past Trips</div>
                <div className={styles.deckContainer}> 
                    {pastTrips.map((trip) => (
                        <TripCard key={trip.key} title={trip.title} date={trip.date} description={trip.description} />
                    ))}
                </div>
            </div>
            
        </div>
    )
}