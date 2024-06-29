import React from "react";
import styles from "@/app/ui/trips/tripEmails.module.scss";
import { oecUser } from "../profile/Profile";

interface TripEmailsProps {
    signedUpUsers: oecUser[];
    capacity: number;
}

export const TripEmails: React.FC<TripEmailsProps> = ({signedUpUsers, capacity }) => {
    const confirmedUsers = signedUpUsers.slice(0, capacity);
    const waitListUsers = signedUpUsers.slice(capacity, signedUpUsers.length);
    const confirmedEmails: string = confirmedUsers.map((user) => user.email).join(', ');
    

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
        <textarea>Hello</textarea>
      </div>
    </div>
  );
};
