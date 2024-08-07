"use client";
import React, { useEffect, useState, useCallback } from "react";
import { StaffDeck } from "./StaffDeck";
import { getStaffList } from "@/config/firestore/staffFirestore";
import styles from "@/app/ui/about/about.module.scss";

export interface Member {
  name: string;
  id: string;
  role: "Staff" | "Manager";
  hometown: string;
  hireDate: string;
  hopes: string;
  graduated: boolean;
  imageURL: string;
}

export const StaffSection = () => {
  const [staffList, setStaffList] = useState<Member[]>([]);
  const [managerList, setManagerList] = useState<Member[]>([]);
  const [graduatedList, setGraduatedList] = useState<Member[]>([]);
  const [grave, setGrave] = useState({
    open: false,
    label: "Pay your respects",
  });

  const fetchStaff = useCallback(async () => {
    const staffData = await getStaffList();
    const staffRoster = staffData.filter(
      (staff) => staff.role == "Staff" && staff.graduated == false
    );
    const managerRoster = staffData.filter(
      (manager) => manager.role == "Manager"
    );
    const gradRoster = staffData.filter(
      (staff) => staff.role == "Staff" && staff.graduated == true
    );
    setStaffList(staffRoster);
    setManagerList(managerRoster);
    setGraduatedList(gradRoster);
  }, []);

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  return (
    <div className={styles.columnContainer}>
      <div className={styles.sectionHeader}>Manager</div>
      <StaffDeck members={managerList} role="Manager" fetchStaff={fetchStaff} />
      <div className={styles.sectionHeader}>Meet the Staff</div>
      <StaffDeck members={staffList} role="Staff" fetchStaff={fetchStaff} />
      <div className={styles.sectionHeader}>Staff Graveyard</div>
      <div className={styles.aboutSubheader}>Gone, but not forgotten</div>
      {grave.open && (
        <StaffDeck
          members={graduatedList}
          role="Staff"
          fetchStaff={fetchStaff}
        />
      )}
      <div className={styles.loadButtonContainer}>
        <button
          className={styles.loadButton}
          onClick={() =>
            grave.open
              ? setGrave({ open: false, label: "Pay your respects" })
              : setGrave({ open: true, label: "Say farewell" })
          }
        >
          {grave.label}
        </button>
      </div>
    </div>
  );
};
