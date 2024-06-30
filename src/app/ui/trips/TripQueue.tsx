"use client";
import React from "react";
import { oecUser } from "../profile/Profile";
import { Trip } from "@/app/dashboard/trips/page";

interface TripQueueProps {
  trip: Trip;
  signedUpUsers: oecUser[];
}

export const TripQueue: React.FC<TripQueueProps> = ({
  trip,
  signedUpUsers,
}) => {

  const isConfirmed = (userId: string) => {
    const verdict = trip.confirmed.includes(userId);
    return verdict;
  };

  return (
    <div>
      <b>Signed up:</b>

      {
        signedUpUsers.length > 0 && (
          <ol>
            {signedUpUsers.map((user) => (
              <div key={user.id}>
                {isConfirmed(user.id) ? (
                  <li >
                    <b>
                      {user.firstName} {user.lastName}
                    </b>{" "}
                    (Confirmed)
                  </li>
                ) : (
                  <li>
                    {user.firstName} {user.lastName}
                  </li>
                )}
              </div>
            ))}
          </ol>
        )
      }
      {
        // no one signed up for trip
        signedUpUsers.length == 0 && <p>No one has signed up for this trip!</p>
      }
    </div>
  );
};
