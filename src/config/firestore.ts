import { getDoc, setDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";


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