"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { fetchSortedAffairs } from "@/config/firestore/firestore";
import styles from "@/app/ui/trips/trips.module.scss";
import { Trip } from "@/app/dashboard/trips/page";
import { ImgAndPlaceholder } from "@/utils/interfaces";
import { useAuth } from "@/config/AuthContext";
import dynamic from "next/dynamic";

interface TripListProps {
  kind: "past" | "present";
  imageArray: ImgAndPlaceholder[];
}

const DynamicTripCard = dynamic(() => import("@/app/ui/cards/TripCard").then(mod => mod.TripCard));

// const DynamicAddButton = dynamic(() => import("@/app/ui/buttons/AddButton").then(mod => mod.AddButton));

export const TripList: React.FC<TripListProps> = ({ kind, imageArray }) => {
  const { isStaff } = useAuth();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [pastTrips, setPastTrips] = useState<Trip[]>([]);
  const currentDate = useMemo(() => new Date(), []);
  const [pastGrave, setPastGrave] = useState({
    open: false,
    label: "View past trips",
  });
  const [currGrave, setCurrGrave] = useState({
    open: false,
    label: "View more trips",
  });

  const fetchTrips = useCallback(async () => {
    const [currentTrips, prevTrips] = (await fetchSortedAffairs(
      currentDate,
      "trips"
    )) as [Trip[], Trip[]];
    setTrips(currentTrips);
    setPastTrips(prevTrips);
  }, [currentDate]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  return (
    <>
    {/* {kind === "present" && isStaff && (<DynamicAddButton label="ADD TRIP" dest="/form/add-trip" />)} */}
    <div className={styles.tripListContainer}>
      <div className={styles.cardDeck}>
      {trips &&
        kind === "present" &&
        trips
          .slice(0, currGrave.open ? trips.length : 2)
          .map((trip, index) => (
            <DynamicTripCard
              key={trip.id}
              id={trip.id}
              index={index}
              title={trip.title}
              date={trip.date}
              shortDescription={trip.shortDescription}
              imageURL={imageArray[index].src}
              blurURL={imageArray[index].placeholder}
              fetchTrips={fetchTrips}
            />
          ))}
      </div>
      <div className={styles.cardDeck}>
      {trips &&
        kind == "past" &&
        pastGrave.open &&
        pastTrips.map((past, index) => (
          <DynamicTripCard
            key={past.id}
            id={past.id}
            index={index}
            title={past.title}
            date={past.date}
            shortDescription={past.shortDescription}
            imageURL={imageArray[index].src}
            blurURL={imageArray[index].placeholder}
            fetchTrips={fetchTrips}
          />
        ))}
        </div>
      {kind === "present" && trips.length === 0 && (
        <div className={styles.emptyTripWarning}>No current trips!</div>
      )}
      <div className={styles.graveButtonContainer}>
        {kind === "present" && trips.length > 2 ? (
          <button
            className={styles.graveButton}
            onClick={() =>
              currGrave.open
                ? setCurrGrave({ open: false, label: "View more trips" })
                : setCurrGrave({ open: true, label: "Close" })
            }
          >
            {currGrave.label}
          </button>
        ) : (
          <button
            className={styles.graveButton}
            onClick={() =>
              pastGrave.open
                ? setPastGrave({ open: false, label: "View past trips" })
                : setPastGrave({ open: true, label: "Close" })
            }
          >
            {pastGrave.label}
          </button>
        )}
      </div>
    </div>
    </>
  );
};
