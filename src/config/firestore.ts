import { getDoc, setDoc, doc, updateDoc, arrayUnion, arrayRemove, collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { Trip } from "@/app/dashboard/trips/page";


export async function addDocToFirestore(username: string, userId: string) {
    console.log("user inside addDoctToFirestore: ", username, userId);
    try {
        const docRef = doc(db, "users", userId);
        await setDoc(docRef, { username: username })
        console.log("New user document created for username:", username);
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error;
    }
};

export async function addTripToFirestore(tripId: string, capacity: number) {
    try {
        const docRef = doc(db, "trips", tripId);
        await setDoc(docRef, { key: tripId })
        console.log("New trip document created for trip:", tripId);
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error;
    }
};


export async function updateTripFromFirestore(tripId: string, userId:string ) {
        try {
            const docRef = doc(db, "trips", tripId);
            const tripDoc = await getDoc(docRef);
            if (tripDoc.exists()) {
                const tripData = tripDoc.data();
                const tripMembers = tripData.members || [];
                // Compare user's high score with current game's high score
                if (!tripMembers.includes(userId)) {
                    addUserToTrip(tripId, userId);
                }
            } else {
                // User document does not exist, create a new document
                console.log("Trip does not exist");
            }
        } catch (error) {
            console.error("Error fetching trip's data:", error);
        }
    };
    
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

export async function getTripList(): Promise<Trip[]> {
    const tripsCollection = await getDocs(collection(db, 'trips'));
    const tripList = tripsCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Trip)); // Ensure the cast to Trip type
    return tripList;
}
