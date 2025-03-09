import Link from "next/link"
import styles from './Header.module.scss'

export default function Header() {
    return(
        <header className={styles.header}>
            <nav>
                <h1>Bed Connect</h1>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    )
}