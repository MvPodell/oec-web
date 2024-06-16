"use client";
import React, { useState, useEffect } from "react";
import styles from "@/app/ui/cards/card.module.scss";
import Image from "next/image";
import { Member } from "../about/StaffSection";
import { EditButton } from "../buttons/EditButton";
import { DeleteButton } from "../buttons/DeleteButton";
import { getAuth } from "firebase/auth";
import { getUserRole } from "@/config/firestore";

interface StaffCardProps {
  person: Member;
  fetchStaff: () => void;
}

function calcYears(hireDate: Date, currentDate: Date) {
  return 
}

export const StaffCard: React.FC<StaffCardProps> = ({ person, fetchStaff }) => {
  const auth = getAuth();
  const [user, setUser] = useState(auth.currentUser);
  const [isStaff, setIsStaff] = useState(false);
  const currentDate = new Date();


  useEffect(() => {
    if (!auth) return;

    return auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setUser(null);
        setIsStaff(false);
      }
      if (user) {
        setUser(user);

        const userRole = await getUserRole(user.uid);
        if (userRole && userRole === "staff") {
          setIsStaff(true);
        } else {
          setIsStaff(false);
        }
      }
    });
  }, [user, auth]);

  return (
    <>
      <div className={styles.cardDeckContainer}>
        <div className={styles.cardStaff}>
          <div className={styles.cardContent}>
            <div className={styles.cardInfoContainerStaff}>
              <div className={styles.cardInfo}>
                <div className={styles.cardHeaderStaff}>{person.name}</div>
                <div className={styles.cardTextAboutQ}>Role</div>
                <div className={styles.cardTextAboutA}>{person.role}</div>
                <div className={styles.cardTextAboutQ}>
                  Hometown
                </div>
                <div className={styles.cardTextAboutA}>{person.hometown}</div>
                <div className={styles.cardTextAboutQ}>
                  Years at OEC
                </div>
                <div className={styles.cardTextAboutA}>{person.hireDate}</div>
                <div className={styles.cardTextAboutQ}>
                  Hopes and Dreams
                </div>
                <div className={styles.cardTextAboutA}>{person.hopes}</div>
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
            
              <div className={styles.buttonContainer}>
                <EditButton
                  editType="staff"
                  id={person.id}
                  isStaff={isStaff}
                  onEdit={fetchStaff}
                />
                <DeleteButton
                  deleteType="staff"
                  id={person.id}
                  onDelete={fetchStaff}
                  isStaff={isStaff}
                />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
