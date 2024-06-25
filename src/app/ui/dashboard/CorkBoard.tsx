"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import styles from "@/app/ui/cards/card.module.scss";
import Image from "next/image";
import { AddButton } from "../buttons/AddButton";
import { fetchSortedEvents } from "@/config/firestore";
import { Event } from "@/app/dashboard/page";
import Link from "next/link";
import { DeleteButton } from "../buttons/DeleteButton";
import { EditButton } from "../buttons/EditButton";
import { useAuth } from "@/config/AuthContext";

interface CorkBoardProps {
  blurredImg: string;
}

export const CorkBoard: React.FC<CorkBoardProps> = ({ blurredImg }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const { isStaff } = useAuth();

  const currentDate = useMemo(() => new Date(), []);

  const loadEvents = useCallback(async () => {
    const sortedEvents = await fetchSortedEvents(currentDate);
    setEvents(sortedEvents);
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

        {events.map((event) => (
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
                  src={event.imageURL || "/images/Pomona.jpeg"}
                  alt="event image"
                  width="6400"
                  height="3600"
                  placeholder="blur"
                  blurDataURL={blurredImg}
                />
                <div className={styles.buttonContainer}>
                  <EditButton
                    editType="event"
                    id={event.id}
                    isStaff={isStaff}
                    onEdit={loadEvents}
                  />
                  <DeleteButton
                    deleteType="event"
                    id={event.id}
                    onDelete={loadEvents}
                    isStaff={isStaff}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
