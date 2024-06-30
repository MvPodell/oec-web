import React, {useState } from "react";
import styles from "@/app/ui/trips/tripConfirm.module.scss";
import { oecUser } from "../profile/Profile";
import { updateTripConfirmed } from "@/config/firestore";
import { Trip } from "@/app/dashboard/trips/page";

interface TripConfirmProps {
  signedUpUsers: oecUser[];
  trip: Trip;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TripConfirm: React.FC<TripConfirmProps> = ({
  signedUpUsers,
  trip,
  setOpen,
}) => {
    const [updatedConfirmed, setUpdatedConfirmed] = useState<string[]>(trip.confirmed)


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await updateTripConfirmed(trip.id, updatedConfirmed);
        } catch(error) {
            console.error("Error updating confirmed list in firestore: ", error)
        }
        setOpen(false);
      };

    const handleCheckboxChange = (userId: string) => {
        // if user not already confirmed, this means box checked -> add them
    if (!updatedConfirmed.includes(userId)) {
      setUpdatedConfirmed([...updatedConfirmed, userId]);
    } else {
        // if user already confirmed, this means box unchecked -> remove them
      setUpdatedConfirmed(updatedConfirmed.filter(id => id !== userId));
    }
  };


  return (
    <div>
      {signedUpUsers.length > 0 && (
        <div >
          <form className={styles.confirmList} onSubmit={handleSubmit} id="confirmed">
            {signedUpUsers.map((user) => (
              <div className={styles.queueSpot} key={user.id}>
                <input type="checkbox" defaultChecked={updatedConfirmed.includes(user.id)} onChange={() => handleCheckboxChange(user.id)}/>
                <label>
                  {user.firstName} {user.lastName}
                </label>
              </div>
            ))}
            <div className={styles.submitButtonContainer}>
              <input type="submit" value="Submit" className={styles.submitButton}></input>
              <label className={styles.submitLabel}>Reload after submission.</label>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
