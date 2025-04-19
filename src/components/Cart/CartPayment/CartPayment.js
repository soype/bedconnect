import styles from './CartPayment.module.scss';
import useCurrencyFormat from '@/hooks/useCurrencyFormat';

export default function CartPayment({cartTotal}) {

    const formatMoney = useCurrencyFormat({currency: 'ARS'});

    return (
        <div className={styles.payment}>
            TOTAL: <span>$ {formatMoney(cartTotal)}</span>
        </div>
    )
}   