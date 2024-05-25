import SideNav from "../ui/dashboard/SideNav"
import styles from '@/app/dashboard/dashboard.module.scss';

export default function Layout({ children}: { children: React.ReactNode }) {
    return (
        <div className={styles.homeContainer}>
            <SideNav />
            <div className={styles.bodyContainer}>
                <div className={styles.banner}>We are closed for the summer! See you in the fall!</div>
                <div className={styles.body}>{children}</div>
            </div>
        </div>
    )
}