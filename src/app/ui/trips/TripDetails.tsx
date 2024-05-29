'use client';
import React, { useState, useEffect } from "react";
import styles from "@/app/ui/trips/trips.module.scss";
import Link from "next/link";
import Image from "next/image";
import { Trip } from "@/app/dashboard/trips/page";
import { auth } from "@/config/firebaseConfig";
import { checkAndAddUser, isUserMemberOfTrip, removeUserFromTrip, currentTripSize, getTripCapacity, getTrip } from "@/config/firestore";
import { useSearchParams } from "next/navigation";

export const TripDetails: React.FC = () => {
    const [isMember, setIsMember] = useState(false);
    const [tripSize, setTripSize] = useState(0);
    const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);

    const user = auth.currentUser;
    const searchParams = useSearchParams();
    const tripId = searchParams.get("id");

    useEffect(() => {
        const fetchTripDetails = async () => {
            if (tripId) {
                const tripData = await getTrip(tripId);
                if (tripData) {
                    setCurrentTrip(tripData);
                    setTripSize(tripData.members.length)
                }
            }
        };

        fetchTripDetails();
    }, [tripId]);

    useEffect(() => {
        const fetchMemberStatus = async () => {
            if (user && currentTrip) {
                const member = currentTrip.members.includes(user.uid);
                setIsMember(member);
            }
        };
        fetchMemberStatus();
    }, [user, currentTrip ]);

    useEffect(() => {
        const fetchTripSize = async () => {
            if (currentTrip) {
                const size = await currentTripSize(currentTrip.id);
                console.log("currently", size, "members on trip");
                setTripSize(size);
            }
        };
        fetchTripSize();
    }, [isMember]);

    const joinTrip = async (e: React.MouseEvent) => {
        e.preventDefault();
        console.log("user: ", user);
        if (user && currentTrip) {
            await checkAndAddUser(currentTrip.id, user.uid);
            setIsMember(true);
        } else {
            alert("Please login to join this trip.");
        }
    };

    const leaveTrip = async (e: React.MouseEvent) => {
        e.preventDefault();
        console.log("user: ", user);
        if (user && currentTrip) {
            await removeUserFromTrip(currentTrip.id, user.uid);
            setIsMember(false);
        } else {
            alert("Please login to leave this trip.");
        }
    };


    return (
        <div className={styles.tripDetailsContainer}>
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
                    <Image priority className={styles.tripDetailsImage} src={`/images/${currentTrip.image}.jpeg`} alt="Joshua Tree" width="800" height="200" />
                    <div className={styles.cardContent}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardHeaderText}>
                                <div className={styles.cardHeaderTitle}>{currentTrip.title}</div>
                                <div className={styles.cardHeaderCapacity}>{tripSize} / {currentTrip.capacity} </div>
                            </div>
                            <div className={styles.cardButtonContainer}>
                                {isMember ? (
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
                        <div className={styles.cardText}>{currentTrip.description}</div>
                    </div>
                </div>
            )}

        </div>
    )
}