import {
  getDoc,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { Trip } from "@/app/dashboard/trips/page";

/**
 *
 * Creates a new trip document in Firestore
 *
 * @param tripId
 * @param capacity
 */
export async function addTripToFirestore(
  tripCapacity: string,
  tripDate: string,
  tripDescription: string,
  tripId: string,
  imageURL: string,
  tripShortDescription: string,
  tripTitle: string
) {
  try {
    const docRef = doc(db, "trips", tripId);
    await setDoc(docRef, {
      key: tripId,
      capacity: tripCapacity,
      date: tripDate,
      description: tripDescription,
      id: tripId,
      imageURL: imageURL,
      shortDescription: tripShortDescription,
      title: tripTitle,
      members: [],
    });
    console.log("New trip document created for trip:", tripId);
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

export async function updateTrip(
  tripCapacity: string,
  tripDate: string,
  tripDescription: string,
  tripId: string,
  imageURL: string,
  tripShortDesc: string,
  tripTitle: string
) {
  try {
    const docRef = doc(db, "trips", tripId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log("No such trip!");
      addTripToFirestore(
        tripCapacity,
        tripDate,
        tripDescription,
        tripId,
        imageURL,
        tripShortDesc,
        tripTitle
      );
      return;
    }

    const existingTrip = docSnap.data();
    const tripMembers = existingTrip.members || [];

    const isDifferent =
      existingTrip.capacity !== tripCapacity ||
      existingTrip.date !== tripDate ||
      existingTrip.description !== tripDescription ||
      existingTrip.imageURL !== imageURL ||
      existingTrip.shortDescription !== tripShortDesc ||
      existingTrip.title !== tripTitle;

    if (isDifferent) {
      await setDoc(docRef, {
        capacity: tripCapacity,
        date: tripDate,
        description: tripDescription,
        id: tripId,
        imageURL: imageURL,
        key: tripId,
        members: tripMembers,
        shortDescription: tripShortDesc,
        title: tripTitle,
      });
      console.log("Trip document updated for trip: ", tripId);
    } else {
      console.log("No changes detected, trip not updated.");
    }
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
}

export async function updateTripConfirmed(
  tripId: string,
  tripConfirmed: string[]
) {
  try {
    const docRef = doc(db, "trips", tripId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log("No such trip!");
      return;
    }

    const existingTrip = docSnap.data();

    await setDoc(docRef, {
      ...existingTrip,
      confirmed: tripConfirmed,
    });
    console.log("Confirmations updated for trip: ", tripId);
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
}

/**
 *
 * Adds a user to a trip
 *
 * @param tripId
 * @param userId
 */
export async function addUserToTrip(tripId: string, userId: string) {
  try {
    const docRef = doc(db, "trips", tripId);
    await updateDoc(docRef, {
      members: arrayUnion(userId),
    });
  } catch (error) {
    console.error("Error adding user to trip: ", error);
  }
}

/**
 *
 * Adds a user to the trip members.
 *
 * @param tripId
 * @param userId
 */
export async function checkAndAddUser(tripId: string, userId: string) {
  try {
    const docRef = doc(db, "trips", tripId);
    const tripDoc = await getDoc(docRef);

    if (tripDoc.exists()) {
      const tripData = tripDoc.data();
      const tripMembers = tripData.members || [];

      if (tripMembers.includes(userId)) {
        console.log("user is already a member of the trip!");
        return;
      } else {
        await updateDoc(docRef, {
          members: arrayUnion(userId),
        });
        console.log("User added to trip");
      }
    } else {
      console.log("Trip does not exist");
    }
  } catch (error) {
    console.error("Error checking or adding user to trip: ", error);
  }
}

/**
 *
 * Removes the user from the trip in Firestore
 *
 * @param tripId
 * @param userId
 */
export async function removeUserFromTrip(tripId: string, userId: string) {
  try {
    const docRef = doc(db, "trips", tripId);
    const tripDoc = await getDoc(docRef);

    if (tripDoc.exists()) {
      await updateDoc(docRef, {
        members: arrayRemove(userId),
      });
      console.log("User removed from the trip.");
    } else {
      console.log("Trip does not exist.");
    }
  } catch (error) {
    console.error("Error removing user from trip: ", error);
  }
}

/**
 * Returns the trip
 *
 * @export
 * @async
 * @param tripId
 * @returns tripData
 */
export async function getTrip(tripId: string) {
  try {
    const docRef = doc(db, "trips", tripId);
    const tripDoc = await getDoc(docRef);

    if (tripDoc.exists()) {
      const tripData = tripDoc.data() as Trip;
      return tripData;
    } else {
      console.log("Trip does not exist.");
    }
  } catch (error) {
    console.error("Error getting trip information: ", error);
  }
}

/**
 *
 * Gets a list of all stored trips
 *
 * @returns tripList
 */
export async function getTripList(): Promise<Trip[]> {
  const tripsCollection = await getDocs(collection(db, "trips"));
  const tripList = tripsCollection.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Trip)
  ); // Ensure the cast to Trip type
  return tripList;
}

export async function deleteTrip(tripId: string) {
  try {
    await deleteDoc(doc(db, "trips", tripId));
  } catch (error) {
    console.error("Error deleting trip: ", error);
  }
}
