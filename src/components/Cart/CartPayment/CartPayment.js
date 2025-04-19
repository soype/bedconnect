import styles from './CartPayment.module.scss';

export default function CartPayment({cartTotal}) {
    return (
        <div className={styles.payment}>
            TOTAL: <span>{cartTotal}</span>
        </div>
    )
}   