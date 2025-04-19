'use client'

import styles from './CartDetail.module.scss';

export default function CartDetail({cart, handleRemove}) {

    return (
        <div className={styles.detail}>
            {cart.map((item) => {
                return(
                    <CartDetailItem key={item.id} item={item} handleRemove={handleRemove}></CartDetailItem>
                )
            })}
        </div>
    )
}

function CartDetailItem({item, handleRemove}) {

    const removeHandler = () => {
        handleRemove(item);
    }

    return(
        <div key={item.id}>
            <div className={styles.remove} onClick={removeHandler}>X</div>
            <div>{item.productDetails.name}</div>
            <div>{item.amount} UNIDADES</div>
            <div>{item.productDetails.cost * item.amount}</div>
        </div>
    )
}