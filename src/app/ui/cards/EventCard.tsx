import React from "react";
import styles from "@/app/ui/cards/card.module.scss";
import { Event } from "@/app/dashboard/page";
import Image from "next/image";
import Link from "next/link";
import { EditButton } from "../buttons/EditButton";
import { DeleteButton } from "../buttons/DeleteButton";
import { ImgAndPlaceholder } from "@/utils/interfaces";
import { useAuth } from "@/config/AuthContext";

interface EventCardProps {
  event: Event;
  index: number;
  imageArray: ImgAndPlaceholder[];
  loadEvents: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  index,
  imageArray,
  loadEvents,
}) => {
  const { isStaff } = useAuth();

  return (
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
              <EditButton editType="event" id={event.id} onEdit={loadEvents} />
              <DeleteButton
                deleteType="event"
                id={event.id}
                onDelete={loadEvents}
              />
            </div>
          )}
        </div>
      </div>
  );
};
