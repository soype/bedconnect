'use client'

import styles from './CatalogueItem.module.scss';
import CatalogueForm from '../CatalogueForm/CatalogueForm';
import useCurrencyFormat from '@/hooks/useCurrencyFormat';

export default function CatalogueItem({ product, userCategory }) {

    const formatMoney = useCurrencyFormat({currency: 'ARS'});

    const getPrice = () => {
        switch(userCategory) {
            case 'a': return product.price_a;
            case 'b': return product.price_b;
            case 'c': return product.price_c;
            case 'd': return product.price_d;
            case 'e': return product.price_e;
            case 'ng': return product.price_ng;
            case 'p': return product.price_p;
            default: return product.price_a;
        }
    };

    const price = getPrice();


    return (
        <tr className={styles.catalogueItem}>
            <td className={styles.name}>{product.name}</td>
            <td className={styles.price}>$ {formatMoney(price)}</td>
            <CatalogueForm product={product}></CatalogueForm>
            <td className={styles.check}>{product.gluten ? '✓' : '-'}</td>
            <td className={styles.check}>{product.vegan ? '✓' : '-'}</td>
            <td className={styles.check}>{product.organic ? '✓' : '-'}</td>
            <td className={styles.check}>{product.keto ? '✓' : '-'}</td>
            <td className={styles.check}>{product.aplv ? '✓' : '-'}</td>
            <td className={styles.check}>{product.nosugar ? '✓' : '-'}</td>
            <td className={styles.check}>{product.noconservants ? '✓' : '-'}</td>
            {userCategory === 'a' && (
                <td>{product.expireTime || '-'}</td>
            )}
        </tr>
    );
}