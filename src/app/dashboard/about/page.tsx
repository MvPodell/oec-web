import React from "react";
import styles from "@/app/ui/about/about.module.scss";
import { AboutCard } from "@/app/ui/cards/AboutCard";
import { StaffSection } from "@/app/ui/about/StaffSection";

export default function Page() {
  return (
    <div>
      <div className={styles.aboutContainer}>
        <div className={styles.aboutHeaderOEC}>About the OEC</div>
        <AboutCard />
      </div>
      <div className={styles.aboutModule}>
        <StaffSection />
      </div>
    </div>
  );
}
