"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { StaffDeck } from "./StaffDeck";
import { getStaffList } from "@/config/firestore";
import styles from "@/app/ui/about/about.module.scss";
import { AddButton } from "../buttons/AddButton";
import { useAuth } from "@/config/AuthContext";

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
  const {isStaff} = useAuth();
  const currentDate = useMemo(() => new Date(), []);

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
    <div className={styles.staffSectionContainer}>
      <div className={styles.aboutHeader}>Manager</div>
      <StaffDeck members={managerList} role="Manager" fetchStaff={fetchStaff} />
      <div className={styles.aboutHeader}>Meet the Staff</div>
      {/* {isStaff && (
        <div className={styles.staffButtonContainer}>
        <AddButton label="Add Personnel" dest="/form/add-staff" />
      </div> */}
      {/* )} */}
      <StaffDeck members={staffList} role="Staff" fetchStaff={fetchStaff} />
      <div className={styles.aboutHeader}>Staff Graveyard</div>
      <div className={styles.aboutSubheader}>Gone, but not forgotten</div>
      {grave.open && (
        <StaffDeck
          members={graduatedList}
          role="Staff"
          fetchStaff={fetchStaff}
        />
      )}
      <div className={styles.graveButtonContainer}>
        <button
          className={styles.graveButton}
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
