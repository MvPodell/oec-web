'use client';
import React, { useState, useEffect, useCallback } from "react";
import styles from "@/app/ui/cards/card.module.scss";
import Link from "next/link";
import Image from "next/image";
import { Trip } from "@/app/dashboard/trips/page";
import { checkAndAddUser, removeUserFromTrip, currentTripSize, getTrip } from "@/config/firestore";
import { useSearchParams } from "next/navigation";
import { TripQueue } from "../trips/TripQueue";
import { getAuth } from "firebase/auth";

export const TripDetails: React.FC = () => {
    const auth = getAuth();
    const [isMember, setIsMember] = useState(false);
    const [user, setUser] = useState(auth.currentUser);
    const [tripSize, setTripSize] = useState(0);
    const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
    const searchParams = useSearchParams();
    const tripId = searchParams.get("id");

    const fetchTripDetails = useCallback(async () => {
        if (tripId) {
                const tripData = await getTrip(tripId);
                if (tripData) {
                    setCurrentTrip(tripData);
                    const size = await currentTripSize(tripData.id);
                    setTripSize(size);
                    if (user) {
                        setIsMember(tripData.members.includes(user.uid));
                    }
                }
            }

    }, [tripId, user]);

    useEffect(() => {
        fetchTripDetails();
    }, [fetchTripDetails]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
            console.log("User set in TripDetails")
        });
        return () => unsubscribe();

    }, [auth]);

    const joinTrip = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (user && currentTrip) {
            await checkAndAddUser(currentTrip.id, user.uid);
            setIsMember(true);
            fetchTripDetails();
        } else {
            alert("Please login to join this trip.");
        }
    };

    const leaveTrip = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (user && currentTrip) {
            await removeUserFromTrip(currentTrip.id, user.uid);
            setIsMember(false);
            fetchTripDetails();
        } else {
            alert("Please login to leave this trip.");
        }
    };

    if (!tripId) {
        return <div>Loading...</div>;
    }

    return (
            <div className={styles.cardDetailsContainer}>
                <div className={styles.backButtonContainer}>
                    <div className={styles.cardButtonContainer}>
                        <Link
                            key="backArrow"
                            href={"/dashboard/trips"}
                            className={styles.cardButton}>
                            Back to Trips
                        </Link>
                    </div>
                </div>
                {currentTrip && (
                    <div className={styles.card}>
                        <Image priority className={styles.cardDetailsImage} src={currentTrip.imageURL} alt="Joshua Tree" width="800" height="200" />
                        <div className={styles.cardInfo}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardHeaderText}>
                                    <div className={styles.cardHeaderTitle}>{currentTrip.title}</div>
                                    <div className={styles.cardHeaderCapacity}>{tripSize} / {currentTrip.capacity} </div>
                                </div>
                                <div className={styles.cardButtonContainer}>
                                    {user && isMember ? (
                                        <button className={styles.joinButton} onClick={(e) => leaveTrip(e)}>
                                            LEAVE TRIP
                                        </button>
                                    ) : (
                                        <button className={styles.joinButton} onClick={(e) => joinTrip(e)}>
                                            JOIN
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className={styles.cardDate}>{currentTrip.date}</div>
                            <div className={styles.cardText}>
                                {currentTrip.description}
                                <div className={styles.cardMemberQueue}>
                                    <TripQueue tripMembers={currentTrip.members} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
    )
}