import React, { useState } from "react";
import styles from "@/app/ui/forms/checkboxForm.module.scss";
import {
  deleteCarouselImage,
  updateCarouselVisibility,
} from "@/config/firestore/carouselFirestore";
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

  const handleDelete = async (event: React.MouseEvent<SVGElement, MouseEvent>, index: number, name: string ) => {
    event.preventDefault();
    try {
      await deleteCarouselImage(index, name);
      const tempCarouselList = currCarouselList;
      tempCarouselList.splice(index, 1);
      setCurrCarouselList(tempCarouselList);

    } catch (error) {
      console.error("Error deleting carousel image in firestore: ", error)
    }
  }

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
                <TrashIcon className={styles.trash} onClick={(event) => handleDelete(event, index, carousel.imageArray[index].imageName)} />
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
