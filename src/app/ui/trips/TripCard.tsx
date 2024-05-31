'use client';
import React, {useState} from "react";
import styles from "@/app/ui/cards/card.module.scss";
import { Trip } from "@/app/dashboard/trips/page";
import Link from "next/link";
import Image from "next/image";

interface TripCardProps {
    id: string,
    title: string,
    date: string,
    shortDescription: string,
    imageURL: string
}

export const TripCard: React.FC<TripCardProps> = ({id, title, date, shortDescription, imageURL }) => {

    return (
        <div className={styles.cardDeckContainer}>
            <div className={styles.card}>
                <div className={styles.cardContainer}>
                    <div className={styles.cardInfoContainer}>
                        <div className={styles.cardContent}>
                            <div className={styles.cardHeader}>{title}</div>
                            <div className={styles.cardDate}>{date}</div>
                            <div className={styles.cardText}>{shortDescription}</div>
                        </div>
                        <div className={styles.cardButtonContainer}>
                            <Link className={styles.cardButton} href={`/dashboard/trips/trip-details?id=${id}`} >
                                LEARN MORE
                            </Link>
                        </div>
                    </div>
                    {imageURL ? (
                        <Image src={imageURL} width="800" height="200" alt={title} className={styles.cardImage} />
                    ) : (
                        <Image src={imageURL} width="800" height="200" alt={title} className={styles.cardImage} />
                    )}
                </div>
            </div>
        </div>

    )
}