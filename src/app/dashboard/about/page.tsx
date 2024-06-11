import React from "react";
import styles from "@/app/dashboard/about/about.module.scss";

export default function Page() {
  return (
    <div>
      <div>
        <div className={styles.aboutHeader}>About the OEC</div>
        <div className={styles.aboutP}>
          The Outdoor Education Center of Pomona College is one of the premier
          outdoor education programs in the country. We provide hands-on
          opportunities for all students in outdoor recreation and education,
          promote the preservation and conservation of the natural environment,
          and develop student leadership skills.
        </div>
        <div className={styles.aboutP}>
          We believe it&apos;s important that students can get out and have fun
          without losing sight of the general mission to educate and build
          leadership skills.
        </div>
        <div className={styles.aboutP}>
          The OEC, housed in LEED Platinum-certified Dialynas Hall (map), is
          deeply committed to sustainable programming and community engagement.
          We have many partnerships, both on and off campus, with academic
          departments, intercollegiate programs, and community organizations.
        </div>
      </div>

      <div className={styles.aboutHeader}>Meet the Staff</div>
      <div className={styles.aboutModule}>
        
      </div>
    </div>
  );
}
