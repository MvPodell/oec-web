"use client";
import React, { useState } from "react";
import styles from "@/app/ui/resources/resources.module.scss";
import { DropDown } from "./DropDown";

export const ResourcesTOC = () => {
  const [gearDrop, setGearDrop] = useState(false);
  const [checkoutDrop, setCheckoutDrop] = useState(false);
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
              The OEC keeps a stock of gear and supplies for free checkout by 5C students and staff. Stop by the center in Dialynas Hall to see what's in stock and to learn more about what we have to offer!
            </div>
          </div>
        </DropDown>
        <DropDown
          label="Checkout Policy"
          stateVal={checkoutDrop}
          stateSetter={setCheckoutDrop}
        >
          <div className={styles.dropBody}>
            <div>
              <ul>
                <li>Upon checking out gear at the OEC, you sign a rental agreement that states what gear you have recieved and when it is due for return. This agreement is sent to the email your account was created under. </li>
                <li>To avoid future disputes, please check this rental agreement to make sure all of the gear you have checked out is listed and that there is not any gear that you did not checkout listed.</li>
                <li>Most gear can be checked out for two weeks at a time. The following gear can only be checked out for 4 days: </li>
                <ul>
                    <li>Surfboards</li>
                    <li>Climbing Shoes</li>
                </ul>
                <li>Most gear for groups can be checked out by one group member. However, the following items must be checked out individually: </li>
                <ul>
                    <li>Sleeping bag</li>
                    <li>Sleeping pad</li>
                </ul>

            </ul>  
            </div>
          </div>
        </DropDown>
        <DropDown
          label="Trip Planning"
          stateVal={tripRecDrop}
          stateSetter={setTripRecDrop}
        >
            <div className={styles.dropBody}>
                <div>Camping Checklist Document</div>
                <div>Backpacking Checklist Document</div>
            </div>
          
        </DropDown>
        <DropDown
          label="Local Hiking"
          stateVal={localDrop}
          stateSetter={setLocalDrop}
        >
            <div className={styles.dropBody}>
                The following resources are non-exhaustive. Please visit the center to find out more!
                <div><b>San Gabriel Mountains hiking: </b></div>
                <ul>
                    <li>Potato Mountain</li>
                    <li>Ice box Canyon</li>
                    <li>Stoddard Peak</li>
                </ul>
                <div><b>Coastal Hiking</b></div>
                <ul>
                    <li>Will Rogers State Park</li>
                    <li>Crystal Cove State Park</li>
                </ul>
            </div>
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
