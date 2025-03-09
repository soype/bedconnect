import Link from "next/link"
import styles from './Header.module.scss'
import { cookies } from 'next/headers'


export default async function Header() {

    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('sessionToken');

    return(
        <header className={styles.header}>
            <nav>
                <h2>Bed Connect</h2>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                    {(sessionToken && sessionToken.value.length > 0 ) ? <li><Link href="/dashboard" className={styles.signin}>Dashboard</Link></li> : <li><Link href="/signin" className={styles.signin}>Sign in</Link></li>}
                </ul>
            </nav>
        </header>
    )
}