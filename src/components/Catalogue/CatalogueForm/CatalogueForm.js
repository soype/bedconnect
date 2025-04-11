'use client'

import styles from './CatalogueForm.module.scss';
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function CatalogueForm({product}) {

    const [amount, setAmount] = useState(0);
    const { cart, setCart } = useCart();

    useEffect(() => {
        const productInCart = cart.find(item => item.id === product.id);
        if(productInCart){
            setAmount(productInCart.amount);
        }
    }, [cart])

    const getModifierAmount = (e) => {
        if (e.shiftKey) return 20;
        if (e.metaKey || e.ctrlKey) return 5;
        return 1;
    };

    const addAmountHandler = (e) => {

        const modifierAmount = getModifierAmount(e);
        const newAmount = amount + modifierAmount;
        setAmount(newAmount);

        const productInCart = cart.find(item => item.id === product.id);
        if(productInCart){
            const newCart = [...cart];
            const index = newCart.findIndex(item => item.id === product.id);
            newCart[index].amount = newAmount;
            setCart(newCart);
        }else{
            setCart([...cart, {id: product.id, productDetails: product, amount: newAmount}]);
        }
        
    }

    const removeAmountHandler = (e) => {
        const modifierAmount = getModifierAmount(e);
        const newAmount = Math.max(amount - modifierAmount, 0);
        setAmount(newAmount);

        const productInCart = cart.find(item => item.id === product.id);
        if (!productInCart) return;

        if (newAmount > 0) {
            const newCart = [...cart];
            const index = newCart.findIndex(item => item.id === product.id);
            newCart[index].amount = newAmount;
            setCart(newCart);
        } else {
            setCart(cart.filter(item => item.id !== product.id));
        }
    };

    return (
        <td className={styles.catalogueForm}>
            <button disabled={amount === 0} onClick={removeAmountHandler}>-</button>
            <div className={styles.amount}>{amount}</div>
            <button onClick={addAmountHandler}>+</button>
        </td>
    )
}