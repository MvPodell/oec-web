"use client";
import React, { useState, useEffect, useCallback } from "react";
import styles from "@/app/ui/cards/cardDetails.module.scss";
import Link from "next/link";
import Image from "next/image";
import { Trip } from "@/app/dashboard/trips/page";
import {
  checkAndAddUser,
  removeUserFromTrip,
  getTrip,
  getUsers,
} from "@/config/firestore";
import { useSearchParams } from "next/navigation";
import { TripQueue } from "../trips/TripQueue";
import { getAuth } from "firebase/auth";
import { useAuth } from "@/config/AuthContext";
import { EmailButton } from "../buttons/EmailButton";
import { oecUser } from "../profile/Profile";
import { ConfirmButton } from "../buttons/ConfirmButton";

export const TripDetails: React.FC = () => {
  const auth = getAuth();
  const { isStaff } = useAuth();
  const [isMember, setIsMember] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
  const [trip, setTrip] = useState<Trip | null>();
  const [members, setMembers] = useState<string[]>([]);
  const [users, setUsers] = useState<oecUser[]>([]);

  const searchParams = useSearchParams();
  const tripId = searchParams.get("id");

  const fetchTripDetails = useCallback(async () => {
    if (tripId) {
      const tripData = await getTrip(tripId);
      if (tripData) {
        setTrip(tripData);
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
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  const joinTrip = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (user && trip) {
      await checkAndAddUser(trip.id, user.uid);
      setIsMember(true);
      fetchTripDetails();
    } else {
      alert("Please login to join this trip.");
    }
  };

  const leaveTrip = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (user && trip) {
      await removeUserFromTrip(trip.id, user.uid);
      setIsMember(false);
      fetchTripDetails();
    } else {
      alert("Please login to leave this trip.");
    }
  };


    useEffect(()=> {
        const fetchUsers = async () => {
            try {
            const userProfiles = await getUsers();
            setUsers(userProfiles); 
            } catch (error) {
                console.error("Error fetching users: ", error);
                setUsers([]);
            }
        } 
        fetchUsers();
    }, []);
    

    useEffect(() => {
        if (trip && trip.members) {
            setMembers(trip.members);
        }
    }, [trip]);
    
    const signedUpUsersMap = new Map(users.map(user => [user.id, user]));
    const signedUpUsers: oecUser[] = members
        .map(memberId => signedUpUsersMap.get(memberId))
        .filter((user): user is oecUser => user !== undefined);

  if (!tripId) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.cardDetailsContainer}>
      <div className={styles.backButtonContainer}>
        <Link
          key="backArrow"
          href={"/dashboard/trips"}
          className={styles.backButton}
        >
          Back to Trips
        </Link>
      </div>
      {trip && (
        <div className={styles.card}>
          <Image
            priority
            className={styles.cardDetailsImage}
            src={trip.imageURL}
            alt="Joshua Tree"
            width="800"
            height="200"
          />
          <div className={styles.cardInfo}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderLeft}>
                <div className={styles.cardHeaderTitle}>{trip.title}</div>
                <div className={styles.cardHeaderCapacity}>
                  {trip.members.length} / {trip.capacity}{" "}
                </div>
                {isStaff && (
                  <div className={styles.cardHeaderButtons}>
                    <EmailButton
                      signedUpUsers={signedUpUsers}
                      trip={trip}
                    />
                    <ConfirmButton
                      signedUpUsers={signedUpUsers}
                      trip={trip}
                    />
                  </div>
                )}
              </div>
              <div className={styles.cardButtonContainer}>
                {user && isMember ? (
                  <button
                    className={styles.joinButton}
                    onClick={(e) => leaveTrip(e)}
                  >
                    LEAVE TRIP
                  </button>
                ) : (
                  <button
                    className={styles.joinButton}
                    onClick={(e) => joinTrip(e)}
                  >
                    JOIN
                  </button>
                )}
              </div>
            </div>
            <div className={styles.cardDate}>{trip.date}</div>
            <div className={styles.cardText}>
              {trip.description}
              <div className={styles.cardMemberQueue}>
                <TripQueue trip={trip} signedUpUsers={signedUpUsers} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
