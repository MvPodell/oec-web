import React from "react";
import styles from "@/app/ui/cards/aboutCard.module.scss";
import Image from "next/image";

export const AboutCard = () => {
  return (
    <div className={styles.aboutCardContainer}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div className={styles.cardInfoContainer}>
            <Image
              priority
              className={styles.aboutCardImage}
              src={"/images/Pomona.jpeg"}
              alt="Temp"
              width="800"
              height="200"
            />
            <div className={styles.cardInfo}>
              <div className={styles.aboutCardHeader}>
                The Outdoor Education Center of Pomona College is one of the
                premier outdoor education programs in the country.
              </div>
              <ul>
                <li className={styles.aboutCardText}>
                  We provide hands-on opportunities for all students in outdoor
                  recreation and education, promote the preservation and
                  conservation of the natural environment, and develop student
                  leadership skills.
                </li>
                <li className={styles.aboutCardText}>
                  We believe it&apos;s important that students can get out and
                  have fun without losing sight of the general mission to
                  educate and build leadership skills.
                </li>
                <li className={styles.aboutCardText}>
                  The OEC, housed in LEED Platinum-certified Dialynas Hall, is
                  deeply committed to sustainable programming and community
                  engagement. We have many partnerships, both on and off campus,
                  with academic departments, intercollegiate programs, and
                  community organizations.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
