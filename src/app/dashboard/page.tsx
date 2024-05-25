
import styles from '@/app/dashboard/dashboard.module.scss';
import { UserName } from '@/config/AuthContext';

export default function Page() {
    return (
        <div>
            <div className={styles.dashHeader}>
                <div className={styles.subtitle}>Welcome to the</div>
                <div className={styles.boldTitle}>OEC</div>
                <div className={styles.subtitle2}>Pomona College's Outdoor Education Center</div>
            </div>
            <div className={styles.dashBody}>
                <div className={styles.dashHours}>
                    <div>Hours:</div> 
                    <div>M-Th: 2pm-8pm</div>
                    <div>Friday: 10am-1pm</div>
                    <div>Sat-Sun: CLOSED</div>
                </div>
                {/* <div>
                The Outdoor Education Center of Pomona College is one of the premier outdoor education programs in the country. We provide hands-on opportunities for all students in outdoor recreation and education, promote the preservation and conservation of the natural environment, and develop student leadership skills. We believe it's important that students can get out and have fun without losing sight of the general mission to educate and build leadership skills. The OEC, housed in LEED Platinum-certified Dialynas Hall (map), is deeply committed to sustainable programming and community engagement. We have many partnerships, both on and off campus, with academic departments, intercollegiate programs, and community organizations. 
                </div> */}
                <UserName />
            </div>
            <div></div>
        </div>
    );
}