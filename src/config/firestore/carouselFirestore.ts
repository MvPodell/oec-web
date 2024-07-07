import {
    getDoc,
    doc,
    updateDoc,
    arrayUnion,
  } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { CarouselImage, CarouselObj } from "@/app/ui/dashboard/carousel/Carousel";

export async function addCarouselImage(imageObj: CarouselImage,) {
    try {
      const docRef = doc(db, "carousel", "carouselList");
      await updateDoc(docRef, {
        imageArray: arrayUnion(imageObj),
      });
    } catch (error) {
        console.error("Error adding imageURL to carousel document: ", error);
      throw error;
    }
  }
  
  export async function getCarouselData(): Promise<CarouselObj> {
    const docRef = doc(db, "carousel", "carouselList");
    const carouselDoc = await getDoc(docRef);
    const carouselData = carouselDoc.data();
    const carouselList = carouselData as CarouselObj;
    return carouselList;
  
  }
  
  export async function updateCarouselVisibility(updatedCarouselList: CarouselImage[]) {
    try {
      const docRef = doc(db, "carousel", "carouselList");
      const carouselList = await getDoc(docRef);
  
      if (!carouselList.exists()) {
        console.log("No such carousel image!");
        return;
      }
  
      const existingCarousel = carouselList.data() as CarouselObj;
  
      if (existingCarousel.imageArray !== updatedCarouselList) {
        await updateDoc(docRef, {
          imageArray: updatedCarouselList,
        });
      }
      
    } catch (error) {
      console.error("Error updating document: ", error);
      throw error;
    }
  }