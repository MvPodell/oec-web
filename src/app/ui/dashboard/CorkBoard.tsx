import React from "react";
import styles from '@/app/dashboard/dashboard.module.scss';
import Image from "next/image";
import Gay from "./gaypril2024.jpg";


export default function CorkBoard() {
    return (
        <div className={styles.corkContainer}>
            <div className={styles.corkHeader}>
                <div className={styles.subheader2}>Upcoming at the OEC</div>
            </div>
            <div className={styles.corkBody}>
                <div className={styles.corkItem}>
                    <div>August 12, 2024</div>
                    <Image className={styles.corkImage} src={Gay} alt="gaypril"></Image>
                </div>
                <div className={styles.corkItem}>
                    <div>August 12, 2024</div>
                    <Image className={styles.corkImage} src={Gay} alt="gaypril"></Image>
                </div>
                <div className={styles.corkItem}>
                    <div>August 12, 2024</div>
                    <Image className={styles.corkImage} src={Gay} alt="gaypril"></Image>
                </div>
            </div>
        </div>

    );
}