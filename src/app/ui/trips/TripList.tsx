"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { getTripList } from "@/config/firestore";
import { TripCard } from "@/app/ui/trips/TripCard";
import styles from "@/app/ui/trips/trips.module.scss";
import { Trip } from "@/app/dashboard/trips/page";

interface TripType {
  kind: "past" | "present";
}

export const TripList: React.FC<TripType> = ({ kind }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [pastTrips, setPastTrips] = useState<Trip[]>([]);
  const currentDate = useMemo(() => new Date(), []);

  const fetchTrips = useCallback(async () => {
    const tripData = await getTripList();
    const currentTrips = tripData
      .filter((trip) => new Date(trip.date) >= currentDate)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const prevTrips = tripData
      .filter((trip) => new Date(trip.date) < currentDate)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setTrips(currentTrips);
    setPastTrips(prevTrips);
  }, [currentDate]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  return (
    <div className={styles.tripListContainer}>
      {trips && kind === "present"
        ? trips.map((trip, index) => (
            <TripCard
              key={trip.id}
              id={trip.id}
              title={trip.title}
              date={trip.date}
              shortDescription={trip.shortDescription}
              imageURL={trip.imageURL || "/images/Pomona.jpeg"}
              index={index}
              fetchTrips={fetchTrips}
            />
          ))
        : pastTrips.map((past, index) => (
            <TripCard
              key={past.id}
              id={past.id}
              title={past.title}
              date={past.date}
              shortDescription={past.shortDescription}
              imageURL={past.imageURL || "/images/Pomona.jpeg"}
              index={index}
              fetchTrips={fetchTrips}
            />
          ))}
      {kind === "present" && trips.length === 0 && (
        <div className={styles.emptyTripWarning}>No current trips!</div>
      )}
    </div>
  );
};
