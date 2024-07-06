import React, { useState } from "react";
import styles from "@/app/ui/trips/tripConfirm.module.scss";
import {
  updateCarouselVisibility,
} from "@/config/firestore";
import { TrashIcon } from "@radix-ui/react-icons";
import { CarouselObj } from "../dashboard/carousel/Carousel";

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
console.log("currCarouselList", currCarouselList);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateCarouselVisibility(currCarouselList);
    } catch (error) {
      console.error("Error updating confirmed list in firestore: ", error);
    }
    setOpen(false);
  };

  const handleCheckboxChange = (index: number) => {
    const tempCarouselList = currCarouselList;
    // toggle value of checked box
    tempCarouselList[index].visible = !tempCarouselList[index].visible;
    setCurrCarouselList(tempCarouselList);
  };

  return (
    <div>
      {carousel.imageArray.length > 0 && (
        <div>
          <form
            className={styles.confirmList}
            onSubmit={handleSubmit}
            id="confirmed"
          >
            {carousel.imageArray.map((imageObj, index) => (
              <div className={styles.queueSpot} key={index}>
                <TrashIcon />
                <input
                  type="checkbox"
                  defaultChecked={carousel.imageArray[index].visible}
                  onChange={() => handleCheckboxChange(index)}
                />
                <label>{imageObj.imageName}</label>
              </div>
            ))}
            <div className={styles.submitButtonContainer}>
              <input
                type="submit"
                value="Submit"
                className={styles.submitButton}
              ></input>
              <label className={styles.submitLabel}>
                Reload after submission.
              </label>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
