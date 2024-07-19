"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import styles from "@/app/ui/dashboard/corkboard/corkboard.module.scss";
import { EventCard } from "../../cards/EventCard";
import { fetchSortedAffairs } from "@/config/firestore/firestore";
import { Event } from "@/app/dashboard/page";
import { ImgAndPlaceholder } from "@/utils/interfaces";

interface CorkBoardProps {
  imageArray: ImgAndPlaceholder[];
}

export const CorkBoard: React.FC<CorkBoardProps> = ({ imageArray }) => {
  const [events, setEvents] = useState<Event[]>([]);

  const currentDate = useMemo(() => new Date(), []);

  const loadEvents = useCallback(async () => {
    const [currEvents, _] = (await fetchSortedAffairs(
      currentDate,
      "events"
    )) as [Event[], Event[]];
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
        <div className={styles.cardDeck}>
          {events.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
              imageArray={imageArray}
              loadEvents={loadEvents}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
