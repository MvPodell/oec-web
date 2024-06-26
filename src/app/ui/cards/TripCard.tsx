"use client";
import React from "react";
import styles from "@/app/ui/cards/card.module.scss";
import Link from "next/link";
import Image from "next/image";
import { EditButton } from "../buttons/EditButton";
import { DeleteButton } from "../buttons/DeleteButton";
import { useAuth } from "@/config/AuthContext";

interface TripCardProps {
  id: string;
  title: string;
  date: string;
  shortDescription: string;
  imageURL: string;
  index: number;
  blurURL: string;
  fetchTrips: () => void;
}

export const TripCard: React.FC<TripCardProps> = ({
  id,
  index,
  title,
  date,
  shortDescription,
  imageURL,
  blurURL,
  fetchTrips,
}) => {
  const { isStaff } = useAuth();

  return (
    <div className={styles.cardDeckContainer}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div className={styles.cardInfoContainer}>
            <div className={styles.cardInfo}>
              <div className={styles.cardHeader}>{title}</div>
              <div className={styles.cardDate}>{date}</div>
              <div className={styles.cardText}>{shortDescription}</div>
            </div>
            <div className={styles.cardButtonContainer}>
              <Link
                className={styles.cardButton}
                href={`/dashboard/trips/trip-details?id=${id}`}
              >
                SEE TRIP DETAILS
              </Link>
            </div>
          </div>
          <Image
            src={imageURL}
            blurDataURL={blurURL}
            placeholder="blur"
            width="1200"
            height="630"
            alt={title}
            className={styles.cardImage}
            priority={index === 0}
          />
          {isStaff && (
            <div className={styles.buttonContainer}>
              <EditButton
                editType="trip"
                id={id}
                onEdit={fetchTrips}
              />
              <DeleteButton
                deleteType="trip"
                id={id}
                onDelete={fetchTrips}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
