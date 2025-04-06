'use client'

import styles from './CatalogueItem.module.scss';

export default function CatalogueItem({ product, userCategory }) {
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

    // Me aseguro que el precio esté ok o que sea 0.
    const price = getPrice();
    const formattedPrice = price


    return (
        <tr className={styles.catalogueItem}>
            <td>{product.name}</td>
            <td>${formattedPrice}</td>
            <td>{product.gluten ? '✓' : '-'}</td>
            <td>{product.vegan ? '✓' : '-'}</td>
            <td>{product.organic ? '✓' : '-'}</td>
            <td>{product.keto ? '✓' : '-'}</td>
            <td>{product.aplv ? '✓' : '-'}</td>
            <td>{product.nosugar ? '✓' : '-'}</td>
            <td>{product.noconservants ? '✓' : '-'}</td>
            {userCategory === 'a' && (
                <td>{product.expireTime || '-'}</td>
            )}
        </tr>
    );
}