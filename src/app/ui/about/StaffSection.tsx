"use client";
import React, {useEffect, useState, useMemo, useCallback} from "react";
import { StaffDeck } from "./StaffDeck";
import { getStaffList } from "@/config/firestore";
import styles from "@/app/ui/about/about.module.scss";

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
  const currentDate = useMemo(() => new Date(), []);

  const fetchStaff = useCallback(async () => {
    const staffData = await getStaffList();
    const staffRoster = staffData
      .filter((staff) => staff.role == "Staff");
    const managerRoster = staffData
      .filter((manager) => manager.role == "Manager");
    setStaffList(staffRoster);
    setManagerList(managerRoster);
  }, []);

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  return (
    <div>
      <StaffDeck members={managerList} role="Manager" fetchStaff={fetchStaff}/>
      <div className={styles.staffDivider}>_________</div>
      <StaffDeck members={staffList} role="Staff" fetchStaff={fetchStaff}/>
    </div>
  );
};
