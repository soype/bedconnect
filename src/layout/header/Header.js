'use client'
import Link from "next/link"
import styles from './Header.module.scss'
import { useAuth } from "@/context/AuthContext";



export default function Header() {

    const auth = useAuth();

    return(
        <header className={styles.header}>
            <nav>
                <h2>Bed Connect</h2>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    {auth.isLogged && <li><Link href="/catalogue">Catalogue</Link></li>}
                    { auth.isLogged ? <li><Link href="/dashboard" className={styles.signin}>Dashboard</Link></li> : <li><Link href="/signin" className={styles.signin}>Sign in</Link></li>}
                </ul>
            </nav>
        </header>
    )
}