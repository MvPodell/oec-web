import styles from '@/app/dashboard/dashboard.module.scss';
import CorkBoard from '../ui/dashboard/CorkBoard';

export interface Event {
    date: string;
    description: string;
    id: string;
    imageURL: string;
    key: string;
    location: string;
    title: string;
};

export default function Page() {
    return (

        <div>
            <div className={styles.dashHeader}>
                <div className={styles.subtitle}>Welcome to the</div>
                <div className={styles.boldTitle}>OEC</div>
                <div className={styles.subtitle2}>The Outdoor Education Center of Pomona College</div>
                <div className={styles.dashHours}>
                    <div>Hours:</div> 
                    <div>M-Th: 2pm-8pm</div>
                    <div>Friday: 10am-1pm</div>
                    <div>Sat-Sun: CLOSED</div>
                </div>
            </div>
            <div className={styles.dashBody}>
                <CorkBoard />
            </div>
            <div></div>
        </div>
    );
}