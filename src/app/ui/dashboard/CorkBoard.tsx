'use client';
import React, { useEffect, useState, useMemo, useCallback } from "react";
import styles from '@/app/dashboard/dashboard.module.scss';
import Image from "next/image";
import { StaffButton } from '../trips/StaffButton';
import { fetchSortedEvents, getUserRole } from "@/config/firestore";
import { Event } from "@/app/dashboard/page";
import Link from "next/link";
import { DeleteButton } from "../buttons/DeleteButton";
import { EditButton } from "../buttons/EditButton";
import { getAuth } from "firebase/auth";

interface CorkBoardProps {
    blurredImg: string,
}

export const CorkBoard: React.FC<CorkBoardProps> = ( { blurredImg }) => {
    const auth = getAuth();

    const [events, setEvents] = useState<Event[]>([]);
    const [user, setUser] = useState(auth.currentUser);
    const [isStaff, setIsStaff] = useState<boolean>(false);

    const currentDate = useMemo(() => new Date(), []);


    const loadEvents = useCallback(async () => {
        const sortedEvents = await fetchSortedEvents(currentDate);
        setEvents(sortedEvents);
    }, [currentDate]);

    useEffect(() => {
        loadEvents();
    }, [ loadEvents ]);

    useEffect(() => {
        if (!auth) return;
        
        return auth.onAuthStateChanged(async (user) => {
            if (!user) {
                setUser(null);
                setIsStaff(false);
            }
            if (user) {
                setUser(user);

                const userRole = await getUserRole(user.uid);
                if ( userRole && userRole === "staff") {
                    setIsStaff(true);
                } else {
                    setIsStaff(false);
                }
            } 
        })
    }, [user, auth]);

    return (
        <div className={styles.corkContainer}>
            <div className={styles.corkHeader}>
                <div className={styles.subheader2}>Upcoming at the OEC</div>
            </div>
            <div className={styles.corkBody}>
                <StaffButton label="Add Event" dest="/form/add-event" />
                <div className={styles.corkEventsContainer}>
                    {events.map(event => (
                        <div className={styles.corkItem} key={event.id}>
                            <Image
                                className={styles.corkItemImage}
                                src={event.imageURL || "/images/Pomona.jpeg"}
                                alt="event image"
                                width="6400"
                                height="3600"
                                placeholder="blur"
                                blurDataURL={blurredImg}
                            />
                            <div className={styles.buttonContainer}>
                                <EditButton editType="event" id={event.id} isStaff={isStaff} onEdit={loadEvents} />
                                <DeleteButton deleteType="event" id={event.id} onDelete={loadEvents} isStaff={isStaff}/>
                            </div>
                            <div className={styles.corkItemBody}>
                                <div className={styles.corkDate}>{event.date}</div>
                                <div className={styles.corkTitle}>{event.title}</div>
                                <div className={styles.corkButtonContainer}>
                                    <Link className={styles.corkButton} href={`/dashboard/event-details?id=${event.id}`} >
                                        LEARN MORE
                                    </Link>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}