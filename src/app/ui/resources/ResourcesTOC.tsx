"use client";
import React, { useState } from "react";
import styles from "@/app/ui/resources/resources.module.scss";
import { DropDown } from "./DropDown";

export const ResourcesTOC = () => {
  const [gearDrop, setGearDrop] = useState(false);
  const [tripRecDrop, setTripRecDrop] = useState(false);
  const [localDrop, setLocalDrop] = useState(false);
  const [npDrop, setNPDrop] = useState(false);

  return (
    <div className={styles.resourcesContainer}>
      <div>This page is under construction!</div>
      <div className={styles.dropDownContainer}>
        <DropDown
          label="Our Gear"
          stateVal={gearDrop}
          stateSetter={setGearDrop}
        >
          <div className={styles.dropBody}>
            <div>
              For a preview of what kind of gear the OEC has to offer, review
              the links below:
            </div>
            <ul>
              <li>Resource 1</li>
            </ul>
          </div>
        </DropDown>
        <DropDown
          label="Trip Planning"
          stateVal={tripRecDrop}
          stateSetter={setTripRecDrop}
        >
          <div>List of trip planning resources</div>
        </DropDown>
        <DropDown
          label="Local Hiking"
          stateVal={localDrop}
          stateSetter={setLocalDrop}
        >
          <div>List of local hiking related resources</div>
        </DropDown>
        <DropDown
          label="National Parks"
          stateVal={npDrop}
          stateSetter={setNPDrop}
        >
          <div>List of national parks related resources</div>
        </DropDown>
      </div>
    </div>
  );
};
