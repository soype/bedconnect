import Link from "next/link"
import styles from './Header.module.scss'

export default function Header() {
    return(
        <header className={styles.header}>
            <nav>
                <h2>Bed Connect</h2>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                    <li><Link href="/signin" className={styles.signin}>Sign in</Link></li>
                </ul>
            </nav>
        </header>
    )
}