import { addDoc, getDoc, setDoc, doc, collection, query, orderBy, limit, getDocs } from "firebase/firestore";
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


// export async function updateDataFromFirestore(userId, ) {
    //     try {
    //         const docRef = doc(db, "users", userId);
    //         const userDoc = await getDoc(docRef);
    //         if (userDoc.exists()) {
    //             const userData = userDoc.data();
    //             const userHighScore = userData.highScore || 0;
    //             // Compare user's high score with current game's high score
    //             if (winTally > userHighScore) {
    //                 saveDataToFireStore(userId, winTally);
    //             }
    //         } else {
    //             // User document does not exist, create a new document
    //             await setDoc(docRef, { username: username, highScore: 0 }); // Initialize high score to 0 or any default value
    //             console.log("New user document created for userId:", userId);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching user's data:", error);
    //     }
    // };
    
    // export async function saveDataToFireStore(userId) {
    //     try {
    //         const docRef = doc(db, "users", userId);
    //         await setDoc(docRef, {
    //             highScore: winTally
    //         }, { merge: true });
    //     } catch (error) {
    //         console.error("Error adding document: ", error);
    //     }
    // };