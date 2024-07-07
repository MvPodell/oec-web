import styles from "@/app/dashboard/dashboard.module.scss";
import { CorkBoard } from "../ui/dashboard/CorkBoard";
import { getCarouselData } from "@/config/firestore/carouselFirestore";
import { getEventList } from "@/config/firestore/eventFirestore";

import { getPlaceholderImage } from "@/utils/ImageOpti";
import Carousel from "../ui/dashboard/carousel/Carousel";
import { EmblaOptionsType } from "embla-carousel";

export interface Event {
  date: string;
  description: string;
  id: string;
  imageURL: string;
  key: string;
  location: string;
  title: string;
}

const OPTIONS: EmblaOptionsType = { loop: true };

export default async function Page() {
  const currentDate = new Date();
  const eventData = await getEventList();
  const carousel = await getCarouselData();

  const sortedImages = eventData
    .filter((event) => new Date(event.date) >= currentDate)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const imagesArray = await Promise.all(
    sortedImages.map(async (event) => {
      const imageWithPlaceholder = await getPlaceholderImage(event.imageURL);
      return imageWithPlaceholder;
    })
  );

  const carouselImages = await Promise.all(
    carousel.imageArray.filter((img) => img.visible === true).map(async (carouselImage) => {
        const imageWithPlaceholder = await getPlaceholderImage(
          carouselImage.imageUrl
        );
        return imageWithPlaceholder;
      })
  );

  return (
    <div>
      <div className={styles.dashContainer}>
        <div className={styles.dashHeader}>
          <div className={styles.dashHeaderCard}>
            <Carousel
              slides={carouselImages}
              carouselData={carousel}
              options={OPTIONS}
            />
            <div className={styles.dashHeaderText}>
              <div className={styles.subtitle2}>
                The Outdoor Education Center of Pomona College
              </div>
              <div className={styles.dashHours}>
                <div>Hours:</div>
                <div>M-Th: 2pm-8pm</div>
                <div>Friday: 10am-1pm</div>
                <div>Sat-Sun: CLOSED</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.dashBody}>
          <CorkBoard imageArray={imagesArray} />
        </div>
      </div>
      <div></div>
    </div>
  );
}
