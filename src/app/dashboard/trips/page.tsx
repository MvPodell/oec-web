import React from "react";
import styles from "@/app/ui/trips/trips.module.scss";
import { TripList } from "@/app/ui/trips/TripList";
import { fetchSortedAffairs } from "@/config/firestore/firestore";
import { getPlaceholderImage } from "@/utils/ImageOpti";

export interface Trip {
  capacity: string;
  confirmed: string[];
  date: string;
  description: string;
  id: string;
  imageURL: string;
  key: string;
  members: string[];
  shortDescription: string;
  title: string;
}

export  default async function Page() {
  const currentDate = new Date();
  const [currentTrips, prevTrips] = await fetchSortedAffairs(currentDate, "trips") as [Trip[], Trip[]];
  
  const currSortedImages = currentTrips
    .filter((trip) => new Date(trip.date) >= currentDate)
    .sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

  const prevSortedImages = prevTrips
    .filter((trip) => new Date(trip.date) < currentDate)
    .sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

  const currImageArray = await Promise.all(
    currSortedImages.map(async (trip) => {
      const imageWithPlaceholder = await getPlaceholderImage(trip.imageURL)
      return imageWithPlaceholder
    }),
  )

  const prevImageArray = await Promise.all(
    prevSortedImages.map(async (trip) => {
      const imageWithPlaceholder = await getPlaceholderImage(trip.imageURL)
      return imageWithPlaceholder
    }),
  )


  return (
    <div className={styles.tripsContainer}>
      <div className={styles.currentTripsSection}>
        <div className={styles.sectionHeaderCurrent}>Current Trips</div>
        <div className={styles.deckContainer}>
          <TripList kind="present" imageArray={currImageArray} />
        </div>
      </div>
      <div className={styles.pastTripsSection}>
        <div className={styles.sectionHeader}>Past Trips</div>
        <div className={styles.deckContainer}>
          <TripList kind="past" imageArray={prevImageArray}/>
        </div>
      </div>
    </div>
  );
}
