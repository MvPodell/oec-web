import SideNav from "../ui/dashboard/sidenav";
import styles from "@/app/dashboard/dashboard.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.topNavContainer}>
        <SideNav />
      </div>
      <div className={styles.sideNavContainer}>
        <SideNav />
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.banner}>
          We are closed for the summer! See you in the fall!
        </div>
        <div className={styles.dashHeader}>
          <div className={styles.subtitle}>Welcome to the</div>
          <div className={styles.boldTitle}>OEC</div>
          <div className={styles.subtitle2}>
            The Outdoor Education Center of Pomona College
          </div>
          <div className={styles.dashHours}>
            <div>Hours:</div>
            <div>M-Th: 2pm-8pm</div>
            <div>Friday: 10am-1pm</div>
            <div>Sat-Sun: CLOSED</div>
          </div>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
