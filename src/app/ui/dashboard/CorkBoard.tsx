"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import styles from "@/app/ui/cards/card.module.scss";
import Image from "next/image";
import { AddButton } from "../buttons/AddButton";
import { fetchSortedAffairs } from "@/config/firestore";
import { Event } from "@/app/dashboard/page";
import Link from "next/link";
import { DeleteButton } from "../buttons/DeleteButton";
import { EditButton } from "../buttons/EditButton";
import { useAuth } from "@/config/AuthContext";
import { ImgAndPlaceholder } from "@/utils/interfaces";

interface CorkBoardProps {
  imageArray: ImgAndPlaceholder[];
}

export const CorkBoard: React.FC<CorkBoardProps> = ({ imageArray }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const { isStaff } = useAuth();

  const currentDate = useMemo(() => new Date(), []);

  const loadEvents = useCallback(async () => {
    const [currEvents, _] = await fetchSortedAffairs(currentDate, "events") as [Event[], Event[]];
    setEvents(currEvents);
  }, [currentDate]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);



  return (
    <div className={styles.corkContainer}>
      <div className={styles.corkHeader}>
        <div className={styles.subheader2}>Upcoming at the OEC</div>
      </div>
      <div className={styles.corkBody}>
        <AddButton label="ADD EVENT" dest="/form/add-event" />

        {events.map((event, index) => (
          <div className={styles.cardDeckContainer} key={event.id}>
            <div className={styles.card}>
              <div className={styles.cardContent}>
                <div className={styles.cardInfoContainer}>
                  <div className={styles.cardInfo}>
                    <div className={styles.cardHeader}>{event.title}</div>
                    <div className={styles.cardDate}>{event.date}</div>
                  </div>
                  <div className={styles.cardButtonContainer}>
                    <Link
                      className={styles.cardButton}
                      href={`/dashboard/event-details?id=${event.id}`}
                    >
                      SEE EVENT DETAILS
                    </Link>
                  </div>
                </div>
                <Image
                  className={styles.cardImage}
                  src={imageArray[index].src}
                  alt="event image"
                  width="630"
                  height="1200"
                  placeholder="blur"
                  blurDataURL={imageArray[index].placeholder}
                />
                {isStaff && (
                  <div className={styles.buttonContainer}>
                  <EditButton
                    editType="event"
                    id={event.id}
                    onEdit={loadEvents}
                  />
                  <DeleteButton
                    deleteType="event"
                    id={event.id}
                    onDelete={loadEvents}
                  />
                </div>
                )}
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
