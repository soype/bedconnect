import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div>
          <h2>Bed Connect</h2>
          <p>Copyright © 2025 Bed Connect</p>
        </div>
        <div></div>
      </div>
    </footer>
  );
}
