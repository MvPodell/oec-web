import TopNav from "../ui/dashboard/TopNav";
import styles from "@/app/dashboard/dashboard.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.mobileNavContainer}>
        <TopNav />
      </div>
      <div className={styles.deskNavContainer}>
        <TopNav />
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
