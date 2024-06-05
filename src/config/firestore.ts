import { getDoc, setDoc, doc, updateDoc, arrayUnion, arrayRemove, collection, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { Trip } from "@/app/dashboard/trips/page";
import { Profile } from "@/app/form/signup/page";
import { Event } from "@/app/dashboard/page";

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
export async function addDocToFirestore(username: string, firstName: string, lastName: string, email: string, userId: string) {
    try {
        const docRef = doc(db, "users", userId);
        await setDoc(docRef, { username: username, firstName: firstName, lastName: lastName, email: email, role: "student" })
        console.log("New user document created for username:", username);
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error;
    }
};


/**
 * Returns the user's role
 *
 * @export
 * @async
 * @param userId - user's id
 * @returns userRole - user's role
 */
export async function getUserRole(userId: string) {
    try {
        const docRef = doc(db, "users", userId);
        const userDoc = await getDoc(docRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            const userRole: string = userData.role;
            return userRole;
        } else {
            console.log("User does not exist!")
        }
    } catch (error) {
        console.error("Error getting user's role: ", error);
    }
}

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
    tripTitle: string,) {
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
            title: tripTitle, })
        console.log("New trip document created for trip:", tripId);
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error;
    }
};

export async function addEventToFirestore(
    eventDate: string,
    eventDescription: string,
    eventId: string,
    imageURL: string,
    eventLocation: string,
    eventTitle: string,) {
    try {
        const docRef = doc(db, "events", eventId);
        await setDoc(docRef, { 
            key: eventId, 
            date: eventDate,
            description: eventDescription,
            id: eventId,
            imageURL: imageURL,
            location: eventLocation,
            title: eventTitle, })
        console.log("New trip document created for event: ", eventId);
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error;
    }
};

/**
 * 
 * Returns a list of all users.
 * 
 * @returns userList - list of user Profiles
 */
export async function getUsers(): Promise<Profile[]> {
    const userCollection = await getDocs(collection(db, 'users'));
    const userList = userCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Profile));
    return userList;
};

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
            members: arrayUnion(userId)
        });
    } catch (error) {
        console.error("Error adding user to trip: ", error);
    }
};

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
                    members: arrayUnion(userId)
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
                members: arrayRemove(userId)
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
 * 
 * Returns if the user is signed up for the trip.
 * 
 * @param tripId 
 * @param userId 
 * @returns 
 */
export async function isUserMemberOfTrip(tripId: string, userId: string): Promise<boolean> {
    try {
        const docRef = doc(db, "trips", tripId);
        const tripDoc = await getDoc(docRef);

        if (tripDoc.exists()) {
            const tripData = tripDoc.data();
            const tripMembers = tripData.members || [];
            return tripMembers.includes(userId);
        } else {
            console.log("Trip does not exist.");
            return false;
        }
    } catch (error) {
        console.error("Error checking if user is a member of trip: ", error);
        return false;
    }
}

/**
 * 
 * Returns if the trip is full. 
 * 
 * @param tripId 
 * @returns
 */
export async function isTripAtCapacity(tripId: string): Promise<boolean> {
    try {
        const docRef = doc(db, "trips", tripId);
        const tripDoc = await getDoc(docRef);

        if (tripDoc.exists()) {
            const tripData = tripDoc.data();
            const tripCapacity = tripData.capacity;
            const tripMembers = tripData.members || [];
            return tripMembers.length === tripCapacity;
        } else {
            console.log("Trip does not exist.");
            return false;
        }
    } catch (error) {
        console.error("Error checking trip capacity: ", error);
        return false;
    }
}

/**
 * 
 * Returns the number of members signed up for the trip.
 * 
 * @param tripId 
 * @returns
 */
export async function currentTripSize(tripId: string) {
    try {
        const docRef = doc(db, "trips", tripId);
        const tripDoc = await getDoc(docRef);

        if (tripDoc.exists()) {
            const tripData = tripDoc.data();
            const tripMembers = tripData.members || [];
            return tripMembers.length;
        } else {
            console.log("Trip does not exist.")
        }
    } catch (error) {
        console.error("Error checking trip size: ", error);
    }
}

/**
 * Returns the capacity of the trip
 *
 * @export
 * @async
 * @param tripId
 * @returns tripCapacity
 */
export async function getTripCapacity(tripId: string) {
    try {
        const docRef = doc(db, "trips", tripId);
        const tripDoc = await getDoc(docRef);

        if (tripDoc.exists()) {
            const tripData = tripDoc.data();
            const tripCapcity = tripData.capacity;
            return tripCapcity;
        } else {
            console.log("Trip does not exist.")
        }
    } catch (error) {
        console.error("Error checking trip capacity: ", error);
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
            console.log("Trip does not exist.")
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
    const tripsCollection = await getDocs(collection(db, 'trips'));
    const tripList = tripsCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Trip)); // Ensure the cast to Trip type
    return tripList;
}

export async function getEventList(): Promise<Event[]> {
    const eventsCollection = await getDocs(collection(db, 'events'));
    const eventList = eventsCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Event)); // Ensure the cast to Event type
    return eventList;
}

/**
 * Returns the event 
 *
 * @export
 * @async
 * @param eventId
 * @returns eventData
 */
export async function getEvent(eventId: string) {
    try {
        const docRef = doc(db, "events", eventId);
        const eventDoc = await getDoc(docRef);

        if (eventDoc.exists()) {
            const eventData = eventDoc.data() as Event;
            return eventData;
        } else {
            console.log("Event does not exist.")
        }
    } catch (error) {
        console.error("Error getting event information: ", error);
    }
}

export const fetchSortedEvents = async (currentDate: Date) => {
    const eventData = await getEventList();
    const sortedEvents = eventData
        .filter(event => new Date(event.date) >= currentDate)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return sortedEvents;
};

export async function deleteEvent(eventId: string) {
    try {
        await deleteDoc(doc(db, "events", eventId));

    } catch (error) {
        console.error("Error deleting event: ", error);
    }
}
