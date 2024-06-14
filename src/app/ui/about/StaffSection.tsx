"use client";
import React, {useEffect, useState, useMemo, useCallback} from "react";
import { StaffDeck } from "./StaffDeck";
import { getStaffList } from "@/config/firestore";
import styles from "@/app/ui/about/about.module.scss";
import { AddButton } from "../buttons/AddButton";

export interface Member {
  name: string;
  id: string;
  role: "Staff" | "Manager";
  hometown: string;
  hireDate: string;
  hopes: string;
  graduated: string;
  imageURL: string;
}

export const StaffSection = () => {
  const [staffList, setStaffList] = useState<Member[]>([]);
  const [managerList, setManagerList] = useState<Member[]>([]);
  const [graduatedList, setGraduatedList] = useState<Member[]>([]);
  const currentDate = useMemo(() => new Date(), []);

  const fetchStaff = useCallback(async () => {
    const staffData = await getStaffList();
    const staffRoster = staffData
      .filter((staff) => staff.role == "Staff" && staff.graduated == "false");
    const managerRoster = staffData
      .filter((manager) => manager.role == "Manager");
      const gradRoster = staffData
      .filter((staff) => staff.role == "Staff" && staff.graduated == "true");
    setStaffList(staffRoster);
    setManagerList(managerRoster);
    setGraduatedList(gradRoster);
  }, []);

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  return (
    <div className={styles.staffSectionContainer}>
      <div className={styles.aboutHeader}>Manager</div>
      <StaffDeck members={managerList} role="Manager" fetchStaff={fetchStaff}/>
      <div className={styles.aboutHeader}>Meet the Staff</div>
      <StaffDeck members={staffList} role="Staff" fetchStaff={fetchStaff}/>
      <div className={styles.aboutHeader}>Staff Graveyard</div>
      <div className={styles.aboutSubheader}>Gone, but not forgotten</div>
      <StaffDeck members={graduatedList} role="Staff" fetchStaff={fetchStaff} />
      <div className={styles.staffButtonContainer}>
        <AddButton label="Add Personnel" dest="/form/add-staff"/>
      </div>
    </div>
  );
};
