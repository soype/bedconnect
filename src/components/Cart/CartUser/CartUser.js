'use client'

import styles from './CartUser.module.scss';

import { useAuth } from "@/context/AuthContext";

export default function CartUser() {

    const auth = useAuth();
    const session = auth.session;
    
    return (
        <div>{session}</div>
    )
}