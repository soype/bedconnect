import styles from './Cart.module.scss'

import CartUser from './CartUser/CartUser';
import CartDetail from './CartDetail/CartDetail';  
import CartPayment from './CartPayment/CartPayment';

export default function Cart() {
    return (
        <div className={styles.cart}>
            <div className={styles.left}>
                <CartUser></CartUser>
            </div>
            <div className={styles.right}>
                <CartDetail></CartDetail>
                <CartPayment></CartPayment>
            </div>
        </div>
    );
}