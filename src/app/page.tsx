import Image from "next/image";
import styles from './app.module.scss';

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.leftBar}>
        <div>hey</div>
      </div>
      <div className={styles.body}>
        <div>Hello</div>
      </div>
    </div>
  );
}
