import React, { useState } from "react";
import styles from "@/app/ui/forms/checkboxForm.module.scss";
import {
  deleteCarouselImage,
  updateCarouselVisibility,
} from "@/config/firestore/carouselFirestore";
import { TrashIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { CarouselObj, CarouselImage } from "../dashboard/carousel/Carousel";

interface EditCarouselProps {
  carousel: CarouselObj;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onEdit: () => void;
}

export const EditCarouselForm: React.FC<EditCarouselProps> = ({
  carousel,
  setOpen,
  onEdit,
}) => {
  const [currCarouselList, setCurrCarouselList] = useState(carousel.imageArray);
  const [deleteList, setDeleteList] = useState<string[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const tempCarouselList = currCarouselList.filter((image) => !deleteList.includes(image.imageName));
      await updateCarouselVisibility(tempCarouselList);
      deleteList.forEach((imageName) => {
        deleteCarouselImage(imageName);
      });
    } catch (error) {
      console.error("Error updating confirmed list in firestore: ", error);
    }
    setOpen(false);
  };

  const handleVisibleChange = (index: number) => {
    const tempCarouselList = currCarouselList;
    // toggle value of checked box
    tempCarouselList[index].visible = !tempCarouselList[index].visible;
    setCurrCarouselList(tempCarouselList);
  };

  const handleDeleteChange = (image: CarouselImage) => {
    let tempDeleteList = deleteList;
    if (tempDeleteList.includes(image.imageName)) {
      tempDeleteList.filter((name) => name !== image.imageName)
    } else {
      tempDeleteList = [...tempDeleteList, image.imageName]
    }
    setDeleteList(tempDeleteList);
  }

  return (
    <div>
      {carousel.imageArray.length > 0 && (
        <div className={styles.confirmListContainer}>
          <div className={styles.iconsRow}>
            <TrashIcon className={styles.confirmIcon} />
            <EyeOpenIcon className={styles.confirmIcon} />
          </div>
          <form
            className={styles.confirmList}
            onSubmit={handleSubmit}
            id="confirmed"
          >
            {carousel.imageArray.map((imageObj, index) => (
              <div className={styles.queueSpot} key={index}>
                <input 
                  type="checkbox"
                  defaultChecked={false}
                  onChange={() => handleDeleteChange(imageObj)}
                  className={styles.confirmCheckbox}
                />
                <input
                  type="checkbox"
                  defaultChecked={carousel.imageArray[index].visible}
                  onChange={() => handleVisibleChange(index)}
                  className={styles.confirmCheckbox}
                />
                <label>{imageObj.imageName}</label>
              </div>
            ))}
            <div className={styles.submitButtonContainer}>
            <label className={styles.submitLabel}>
                Reload after submission.
              </label>
              <input
                type="submit"
                value="Submit"
                className={styles.submitButton}
              ></input>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
