'use client'

import styles from './CatalogueForm.module.scss';
import { useState, useEffect } from "react";


export default function CatalogueForm() {

    const [amount, setAmount] = useState(0);

    const addAmountHandler = () => {
        setAmount(amount + 1);
    }

    const removeAmountHandler = () => {
        if(amount >= 1){
            setAmount(amount - 1);
        }
    }

    return (
        <td className={styles.catalogueForm}>
            <button disabled={amount === 0} onClick={removeAmountHandler}>-</button>
            <div className={styles.amount}>{amount}</div>
            <button onClick={addAmountHandler}>+</button>
        </td>
    )
}