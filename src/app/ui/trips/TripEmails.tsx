import React from "react";
import styles from "@/app/ui/trips/tripEmails.module.scss";
import { oecUser } from "../profile/Profile";
import { Trip } from "@/app/dashboard/trips/page";

interface TripEmailsProps {
    signedUpUsers: oecUser[];
    trip: Trip;
}

export const TripEmails: React.FC<TripEmailsProps> = ({signedUpUsers, trip }) => {
    const confirmedUsers = signedUpUsers.filter((user) => trip.confirmed.includes(user.id) )
    const waitlistUsers = signedUpUsers.filter((user) => !trip.confirmed.includes(user.id) )
    const confirmedEmails: string = confirmedUsers.map((user) => user.email).join(', ');
    const waitlistEmails: string = waitlistUsers.map((user) => user.email).join(', ');

  return (
    <div className={styles.emailContainer}>
      <div className={styles.emailBlock}>
        <div>Drivers</div>
        <textarea>Hello</textarea>
      </div>
      <div className={styles.emailBlock}>
        <div>Confirmed members</div>
        <textarea defaultValue={confirmedEmails}></textarea>
      </div>
      <div className={styles.emailBlock}>
        <div>Waitlist members</div>
        <textarea defaultValue={waitlistEmails}></textarea>
      </div>
    </div>
  );
};
