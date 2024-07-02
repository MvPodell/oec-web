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

const getLastName = (name: string) => {
  const parts = name.split(" ");
  return parts[parts.length - 1];
};

export const StaffDeck: React.FC<StaffDeckProps> = ({ members, role, fetchStaff }) => {

  const sortedMembers = [...members].sort((a, b) => {
    const lastNameA = getLastName(a.name).toLowerCase();
    const lastNameB = getLastName(b.name).toLowerCase();
    if (lastNameA < lastNameB) return -1;
    if (lastNameA > lastNameB) return 1;
    return 0;
  });

  return (
    <div className={styles.staffDeck}>
      {role == "Manager"
        ? sortedMembers.map((manager, index) => (
            <StaffCard person={manager} key={index} fetchStaff={fetchStaff}/>
          ))
        : sortedMembers.map((member, index) => (
            <StaffCard person={member} key={index} fetchStaff={fetchStaff}/>
          ))}
    </div>
  );
};
