'use client'

import styles from './Cart.module.scss'

import { useMemo } from 'react';

import CartUser from './CartUser/CartUser';
import CartDetail from './CartDetail/CartDetail';  
import CartPayment from './CartPayment/CartPayment';

import {useCart} from '@/context/CartContext';

export default function Cart() {

    const { cart, setCart } = useCart();

    const cartTotal = useMemo(() => {
        return cart.reduce((total, item) => {
            return total + item.productDetails.cost * item.amount;
        }, 0)
    }, [cart]);

    const removeHandler = (item) => {
        setCart(prevCart => {
            return (
                prevCart.filter(i => i.id !== item.id)
            )
        });
    };

    return (
        <div className={styles.cart}>
            <div className={styles.left}>
                <CartDetail cart={cart} handleRemove={removeHandler}></CartDetail>
                
            </div>
            <div className={styles.right}>
                <CartUser></CartUser>
                <CartPayment cart={cart} cartTotal={cartTotal}></CartPayment>
            </div>
        </div>
    );
}