import React from "react";
import styles from "@/app/ui/about/about.module.scss";
import { AboutCard } from "@/app/ui/cards/AboutCard";
import { StaffSection } from "@/app/ui/about/StaffSection";
import classNames from "classnames";

export default function Page() {
  return (
    <div className={styles.columnContainer}>
      <div className={classNames(styles.section, styles.blueSection)}>
        <div className={classNames(styles.sectionHeader, styles.white)}>About the OEC</div>
        <AboutCard />
      </div>
      <div className={styles.aboutModule}>
        <StaffSection />
      </div>
    </div>
  );
}
