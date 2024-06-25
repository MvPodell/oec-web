import React from "react";
import styles from "@/app/ui/about/about.module.scss";
import { ResourcesTOC } from "@/app/ui/resources/ResourcesTOC";
import { StaffSection } from "@/app/ui/about/StaffSection";

export default function Page() {
  return (
    <div>
      <div className={styles.resourcesContainer}>
        <div className={styles.aboutHeader}>Resources</div>
        <ResourcesTOC />
      </div>
      <div className={styles.aboutModule}>
        {/* <StaffSection /> */}
      </div>
    </div>
  );
}
