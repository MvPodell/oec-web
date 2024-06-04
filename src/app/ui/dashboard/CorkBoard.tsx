'use client';
import { Heading, Card, Inset, Text, Button, Separator } from "@radix-ui/themes";
import React, { useEffect, useState, useMemo } from "react";
import styles from '@/app/dashboard/dashboard.module.scss';
import Image from "next/image";
import { StaffButton } from '../trips/StaffButton';
import { getEventList } from "@/config/firestore";
import { Event } from "@/app/dashboard/page";
import Link from "next/link";

interface CorkBoardProps {
    blurredImg: string,
}

export const CorkBoard: React.FC<CorkBoardProps> = ( { blurredImg }) => {
    const [events, setEvents] = useState<Event[]>([]);

    const currentDate = useMemo(() => new Date(), []);

    useEffect(() => {
        const fetchEvents = async () => {
            const eventData = await getEventList();
            const sortedEvents = eventData
                .filter(event => new Date(event.date) >= currentDate)
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            setEvents(sortedEvents);
        };
        fetchEvents();
    }, [ currentDate ]);

    return (
        <div className={styles.corkContainer}>
            {/* <div className={styles.corkHeader}> */}
                <Heading color="blue" weight="medium" >Upcoming at the OEC</Heading>
            {/* </div> */}
            <Separator orientation="horizontal" size="4"/>
            <div className={styles.corkBody}>
                <StaffButton label="Add Event" dest="/form/add-event" />
                <div className={styles.corkEventsContainer}>
                    {events.map(event => (
                        <Card variant="classic" className={styles.corkItem} key={event.id}>
                            <Inset clip="border-box" side="top" pb="current">
                                <Image
                                    className={styles.corkItemImage}
                                    src={event.imageURL || "/images/Pomona.jpeg"}
                                    alt="event image"
                                    width="6400"
                                    height="3600"
                                    placeholder="blur"
                                    blurDataURL={blurredImg}
                                />
                            </Inset>
                            <div className={styles.corkItemBody}>
                                <Text size="4" align="center" color="blue" weight="light">{event.date}</Text>
                                <Text size="7" align="center" weight="regular">{event.title}</Text>
                                <div className={styles.corkButtonContainer}>
                                    <Button variant="ghost">
                                        <Link className={styles.corkButton} href={`/dashboard/event-details?id=${event.id}`} >
                                            LEARN MORE
                                        </Link>
                                    </Button>
                                </div>

                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>

    );
}