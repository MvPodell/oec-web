import styles from "@/app/dashboard/dashboard.module.scss";
import { CorkBoard } from "../ui/dashboard/CorkBoard";
import { getPlaiceholder } from "plaiceholder";
import { getEventList } from "@/config/firestore";
import { getPlaceholderImage } from '@/utils/ImageOpti'

export interface Event {
  date: string;
  description: string;
  id: string;
  imageURL: string;
  key: string;
  location: string;
  title: string;
}

export default async function Page() {
  const currentDate = new Date();
  const eventData = await getEventList();
  
  const sortedImages = eventData
    .filter((event) => new Date(event.date) >= currentDate)
    .sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

  const imagesArray = await Promise.all(
    sortedImages.map(async (event) => {
      const imageWithPlaceholder = await getPlaceholderImage(event.imageURL)
      return imageWithPlaceholder
    }),
  )

  return (
    <div>
      <div className={styles.dashContainer}>
        <div className={styles.dashHeader}>
          <div className={styles.dashHeaderText}>
            <div className={styles.subtitle}>Welcome to the</div>
            <div className={styles.boldTitle}>OEC</div>
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
        <div className={styles.dashBody}>
          <CorkBoard imageArray={imagesArray} />
        </div>
      </div>
      <div></div>
    </div>
  );
}
