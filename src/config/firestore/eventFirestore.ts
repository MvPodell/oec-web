import {
    getDoc,
    setDoc,
    doc,
    collection,
    getDocs,
    deleteDoc,
  } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { Event } from "@/app/dashboard/page";


export async function addEventToFirestore(
    eventDate: string,
    eventDescription: string,
    eventId: string,
    imageURL: string,
    eventLocation: string,
    eventTitle: string
  ) {
    try {
      const docRef = doc(db, "events", eventId);
      await setDoc(docRef, {
        key: eventId,
        date: eventDate,
        description: eventDescription,
        id: eventId,
        imageURL: imageURL,
        location: eventLocation,
        title: eventTitle,
      });
      console.log("New trip document created for event: ", eventId);
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  }

export async function deleteEvent(eventId: string) {
    try {
      await deleteDoc(doc(db, "events", eventId));
    } catch (error) {
      console.error("Error deleting event: ", error);
    }
  }

  export async function updateEvent(
    eventDate: string,
    eventDescription: string,
    eventId: string,
    imageURL: string,
    eventLocation: string,
    eventTitle: string
  ) {
    try {
      const docRef = doc(db, "events", eventId);
      const docSnap = await getDoc(docRef);
  
      if (!docSnap.exists()) {
        console.log("No such event!");
        addEventToFirestore(
          eventDate,
          eventDescription,
          eventId,
          imageURL,
          eventLocation,
          eventTitle
        );
        return;
      }
  
      const existingEvent = docSnap.data();
  
      const isDifferent =
        existingEvent.date !== eventDate ||
        existingEvent.description !== eventDescription ||
        existingEvent.imageURL !== imageURL ||
        existingEvent.location !== eventLocation ||
        existingEvent.title !== eventTitle;
  
      if (isDifferent) {
        await setDoc(docRef, {
          key: eventId,
          date: eventDate,
          description: eventDescription,
          id: eventId,
          imageURL: imageURL,
          location: eventLocation,
          title: eventTitle,
        });
        console.log("Event document updated for event: ", eventId);
      } else {
        console.log("No changes detected, event not updated.");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
      throw error;
    }
  }

  export async function getEventList(): Promise<Event[]> {
    const eventsCollection = await getDocs(collection(db, "events"));
    const eventList = eventsCollection.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Event)
    ); // Ensure the cast to Event type
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
        console.log("Event does not exist.");
      }
    } catch (error) {
      console.error("Error getting event information: ", error);
    }
  }