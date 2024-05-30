'use client';
import React, { useEffect, useState } from "react";
import styles from '@/app/dashboard/dashboard.module.scss';
import Image from "next/image";
import { StaffButton } from '../trips/StaffButton';
import { getEventList } from "@/config/firestore";
import { Event } from "@/app/dashboard/page";


export default function CorkBoard() {
    const [events, setEvents] = useState<Event[]>([]);

    const currentDate = new Date();

    useEffect(() => {
        const fetchEvents = async () => {
            const eventData = await getEventList();
            const sortedEvents = eventData.filter(event => new Date(event.date) >= currentDate).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            setEvents(sortedEvents);
        };
        fetchEvents();
    }, []);

    return (
        <div className={styles.corkContainer}>
            <StaffButton label="Add Event" dest="/form/add-event" />
            <div className={styles.corkHeader}>
                <div className={styles.subheader2}>Upcoming at the OEC</div>
            </div>
            <div className={styles.corkBody}>
                {events.map(event => (
                    <div className={styles.corkItem}>
                        <div className={styles.corkDate}>{event.date}</div>
                        <Image 
                            className={styles.corkImage}
                            src={event.imageURL || "/images/Pomona.jpeg"}
                            alt="event image"
                            width="200"
                            height="1000"
                        />
                    </div>
                ))}
            </div>
        </div>

    );
}