import React from "react";
import styles from "@/app/ui/about/about.module.scss";
import { ResourcesTOC } from "@/app/ui/resources/ResourcesTOC";

export default function Page() {
  return (
    <div>
      <div className={styles.columnContainer}>
        <div className={styles.sectionHeader}>Resources</div>
        <ResourcesTOC />
      </div>
    </div>
  );
}
