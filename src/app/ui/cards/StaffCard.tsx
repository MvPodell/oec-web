"use client";
import React from "react";
import styles from "@/app/ui/cards/staffCard.module.scss";
import Image from "next/image";
import { Member } from "../about/StaffSection";
import { EditButton } from "../buttons/EditButton";
import { DeleteButton } from "../buttons/DeleteButton";
import { useAuth } from "@/config/AuthContext";

interface StaffCardProps {
  person: Member;
  fetchStaff: () => void;
}

export const StaffCard: React.FC<StaffCardProps> = ({ person, fetchStaff }) => {
  const { isStaff } = useAuth();
  return (
    <>
        <div className={styles.cardStaff}>
          <div className={styles.cardContent}>
            <div className={styles.cardInfoContainerStaff}>
              <div className={styles.cardInfo}>
                <div className={styles.cardHeaderStaff}>{person.name}</div>
                <div className={styles.aboutCardTextQ}>Role</div>
                <div className={styles.aboutCardTextA}>{person.role}</div>
                <div className={styles.aboutCardTextQ}>Hometown</div>
                <div className={styles.aboutCardTextA}>{person.hometown}</div>
                <div className={styles.aboutCardTextQ}>Years at OEC</div>
                <div className={styles.aboutCardTextA}>{person.hireDate}</div>
                <div className={styles.aboutCardTextQ}>Hopes and Dreams</div>
                <div className={styles.aboutCardTextA}>{person.hopes}</div>
              </div>
            </div>
            <div className={styles.cardStaffImageContainer}>
              {person.imageURL && (
                <Image
                  priority
                  className={styles.cardStaffImage}
                  src={person.imageURL}
                  alt="Temp"
                  width="800"
                  height="200"
                />
              )}
            </div>
            {isStaff && (
              <div className={styles.buttonContainer}>
                <EditButton
                  editType="staff"
                  id={person.id}
                  onEdit={fetchStaff}
                />
                <DeleteButton
                  deleteType="staff"
                  id={person.id}
                  onDelete={fetchStaff}
                />
              </div>
            )}
          </div>
        </div>
    </>
  );
};
