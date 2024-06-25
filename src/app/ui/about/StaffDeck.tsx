"use client";
import React from "react";
import { StaffCard } from "../cards/StaffCard";
import { Member } from "./StaffSection";
import styles from "@/app/ui/about/about.module.scss";


interface StaffDeckProps {
  members: Member[];
  role: "Staff" | "Manager";
  fetchStaff: () => void;
}
export const StaffDeck: React.FC<StaffDeckProps> = ({ members, role, fetchStaff }) => {
  return (
    <div className={styles.staffDeck}>
      {role == "Manager"
        ? members.map((manager, index) => (
            <StaffCard person={manager} key={index} fetchStaff={fetchStaff}/>
          ))
        : members.map((member, index) => (
            <StaffCard person={member} key={index} fetchStaff={fetchStaff}/>
          ))}
    </div>
  );
};
