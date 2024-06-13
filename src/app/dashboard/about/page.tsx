import React from "react";
import styles from "@/app/dashboard/about/about.module.scss";
import { AboutCard } from "@/app/ui/cards/AboutCard";

export default function Page() {
  return (
    <div>
      <div className={styles.aboutContainer}>
        <div className={styles.aboutHeaderOEC}>About the OEC</div>
        <AboutCard />
        
      </div>
      

      <div className={styles.aboutHeader}>Meet the Staff</div>
      <div className={styles.aboutModule}>
        
      </div>
    </div>
  );
}
