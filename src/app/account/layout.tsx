import TopNav from "../ui/dashboard/topnav/TopNav";
import styles from "@/app/dashboard/dashboard.module.scss";
import dynamic from "next/dynamic";

export default function Layout({ children }: { children: React.ReactNode }) {
  const DynamicFooter = dynamic(() => import("../ui/footer/Footer").then(mod => mod.Footer), {
    ssr: false,
  });


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
      <DynamicFooter />
    </div>
  );
}
