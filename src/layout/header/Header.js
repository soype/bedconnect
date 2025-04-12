'use client'
import Link from "next/link"
import styles from './Header.module.scss'
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

import { useState, useEffect } from "react";



export default function Header() {

    const auth = useAuth();
    const { cart } = useCart();

    const [amount, setAmount] = useState(0);

    useEffect(() => {
        const totalAmount = cart.reduce((acc, item) => acc + item.amount, 0);
        setAmount(totalAmount);
    }, [cart]);

    return(
        <header className={styles.header}>
            <nav>
                <div className={styles.headerContainer}>
                    <h2>Bed Connect</h2>
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        {auth.isLogged && <li><Link href="/catalogue">Catalogue</Link></li>}
                        {/* <li><Link href="/dashboard" className={styles.signin}>Dashboard</Link></li> */}
                        { auth.isLogged ? <li><Link className={styles.cart} href="/cart">Cart: {amount}</Link></li> : <li><Link href="/signin" className={styles.signin}>Sign in</Link></li>}
                    </ul>
                </div>
            </nav>
        </header>
    )
}