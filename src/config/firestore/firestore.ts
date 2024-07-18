import { getDoc, setDoc, doc, collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { Trip } from "@/app/dashboard/trips/page";
import { Event } from "@/app/dashboard/page";
import { oecUser } from "@/app/ui/profile/Profile";
import { getEventList } from "@/config/firestore/eventFirestore";
import { getTripList } from "./tripFirestore";

/**
 *
 * Creates a new user Document in Firestore
 *
 * @param username
 * @param firstName
 * @param lastName
 * @param email
 * @param userId
 */
export async function addUserToFirestore(
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  userId: string
) {
  try {
    const docRef = doc(db, "users", userId);
    await setDoc(docRef, {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: "student",
    });
    console.log("New user document created for username:", username);
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

/**
 * Returns the user's data
 *
 * @export
 * @async
 * @param userId - user's id
 * @returns oecUser object - { email, firstName, lastName, role, username }
 */
export async function getUserData(userId: string) {
  try {
    const docRef = doc(db, "users", userId);
    const userDoc = await getDoc(docRef);

    if (userDoc.exists()) {
      let userData = userDoc.data();
      userData = {
        ...userData,
        id: userId
      };
      return userData as oecUser;
    } else {
      console.log("User does not exist!");
    }
  } catch (error) {
    console.error("Error getting user's data: ", error);
  }
}

export async function updateUser(
  firstName: string,
  lastName: string,
  userId: string,
  email: string,
  role: string,
  username: string
) {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log("No such user!");
      addUserToFirestore(email, firstName, lastName, role, username);
      return;
    }

    const existingUser = docSnap.data();

    const isDifferent =
      existingUser.firstName !== firstName ||
      existingUser.lastName !== lastName ||
      existingUser.email !== email ||
      existingUser.role !== role ||
      existingUser.username !== username;

    if (isDifferent) {
      await setDoc(docRef, {
        firstName: firstName,
        lastName: lastName,
        role: role,
        username: username,
        email: email,
      });
    } else {
      console.log("No changes detected, user not updated.");
    }
  } catch (error) {
    console.error("Error updating user document: ", error);
    throw error;
  }
}

/**
 *
 * Returns a list of all users.
 *
 * @returns userList - list of user Profiles
 */
export async function getUsers(): Promise<oecUser[]> {
  const userCollection = await getDocs(collection(db, "users"));
  const userList = userCollection.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as oecUser)
  );
  return userList;
}

/**
 *
 * Gets a sorted list of all upcoming trips/events and a sorted list of all prev trips/events
 *
 * @returns currAffairs and prevAffairs
 */
export const fetchSortedAffairs = async (
  currentDate: Date,
  kind: "events" | "trips"
): Promise<[Trip[], Trip[]] | [Event[], Event[]]> => {
  const affairData =
    kind === "events" ? await getEventList() : await getTripList();
  const currAffairs = affairData
    .filter((affair) => new Date(affair.date) >= currentDate)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const prevAffairs = affairData
    .filter((affair) => new Date(affair.date) < currentDate)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return [currAffairs, prevAffairs] as [Trip[], Trip[]] | [Event[], Event[]];
};
