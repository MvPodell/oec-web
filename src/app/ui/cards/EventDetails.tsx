'use client';
import React, { useState, useEffect, Suspense } from "react";
import styles from "@/app/ui/cards/card.module.scss";
import Link from "next/link";
import Image from "next/image";
import { Event } from "@/app/dashboard/page";
import { getEvent } from "@/config/firestore";
import { useSearchParams } from "next/navigation";

export const EventDetails: React.FC = () => {
    const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

    const searchParams = useSearchParams();
    const eventId = searchParams.get("id");



    useEffect(() => {
        const fetchEventDetails = async () => {
            if (eventId) {
                const eventData = await getEvent(eventId);
                if (eventData) {
                    setCurrentEvent(eventData);
                }
            }
        };
        fetchEventDetails();
    }, [eventId]);


    return (
            <div className={styles.cardDetailsContainer}>
                <div className={styles.backButtonContainer}>
                    <div className={styles.cardButtonContainer}>
                        <Link
                            key="backArrow"
                            href={"/dashboard"}
                            className={styles.cardButton}>
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
                {currentEvent && (
                    <div className={styles.card}>
                        <Image className={styles.cardDetailsImage} src={currentEvent.imageURL} alt="event poster" width="800" height="200" />
                        <div className={styles.cardContent}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardHeaderText}>
                                    <div className={styles.cardHeaderTitle}>{currentEvent.title}</div>
                                </div>
                            </div>
                            <div className={styles.cardDate}>{currentEvent.date}</div>
                            <div className={styles.cardDate}>{currentEvent.location}</div>
                            <div className={styles.cardText}>
                                {currentEvent.description}
                            </div>
                        </div>
                    </div>
                )}

            </div>
    )
}