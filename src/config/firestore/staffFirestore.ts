import {
    getDoc,
    setDoc,
    doc,
    collection,
    getDocs,
    deleteDoc,
  } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { Member } from "@/app/ui/about/StaffSection";


export async function deleteStaff(staffId: string) {
    try {
      await deleteDoc(doc(db, "staff", staffId));
    } catch (error) {
      console.error("error deleting staff from firestore: ", error);
    }
  }

  
  export async function addStaffToFirestore(
    staffName: string,
    staffId: string,
    staffRole: string,
    staffHometown: string,
    staffHireDate: string,
    staffHopes: string,
    staffGraduated: boolean,
    imageURL: string
  ) {
    try {
      const docRef = doc(db, "staff", staffId);
      await setDoc(docRef, {
        key: staffId,
        name: staffName,
        role: staffRole,
        hometown: staffHometown,
        hireDate: staffHireDate,
        hopes: staffHopes,
        graduated: staffGraduated,
        imageURL: imageURL,
      });
      console.log("New staff document created for event: ", staffId);
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  }

  export async function updateStaff(
    staffName: string,
    staffId: string,
    staffRole: string,
    staffHometown: string,
    staffHireDate: string,
    staffHopes: string,
    staffGraduated: boolean,
    staffImageURL: string
  ) {
    try {
      const docRef = doc(db, "staff", staffId);
      const docSnap = await getDoc(docRef);
  
      if (!docSnap.exists()) {
        console.log("No such staff!");
        addStaffToFirestore(
          staffName,
          staffId,
          staffRole,
          staffHometown,
          staffHireDate,
          staffHopes,
          staffGraduated,
          staffImageURL
        );
        return;
      }
  
      const existingMember = docSnap.data();
  
      const isDifferent =
        existingMember.name !== staffName ||
        existingMember.role !== staffRole ||
        existingMember.hometown !== staffHometown ||
        existingMember.hireDate !== staffHireDate ||
        existingMember.hopes !== staffHopes ||
        existingMember.graduated !== staffGraduated ||
        existingMember.imageURL !== staffImageURL;
  
      if (isDifferent) {
        await setDoc(docRef, {
          key: staffId,
          name: staffName,
          role: staffRole,
          hometown: staffHometown,
          hireDate: staffHireDate,
          hopes: staffHopes,
          graduated: staffGraduated,
          imageURL: staffImageURL,
        });
        // console.log("Event document updated for staff: ", staffId);
      } else {
        console.log("No changes detected, staff not updated.");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
      throw error;
    }
  }

  export async function getStaffList(): Promise<Member[]> {
    const staffCollection = await getDocs(collection(db, "staff"));
    const staffList = staffCollection.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Member)
    ); // Ensure the cast to Member type
    return staffList;
  }

  /**
 * Returns the staff member
 *
 * @export
 * @async
 * @param eventId
 * @returns eventData
 */
export async function getStaff(staffId: string) {
    try {
      const docRef = doc(db, "staff", staffId);
      const eventDoc = await getDoc(docRef);
  
      if (eventDoc.exists()) {
        const staffData = eventDoc.data() as Member;
        return staffData;
      } else {
        console.log("Staff member does not exist.");
      }
    } catch (error) {
      console.error("Error getting staff information: ", error);
    }
  }