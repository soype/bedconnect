import styles from "./Catalogue.module.scss";
import Hero from "@/components/Hero/Hero";

export default async function Catalogue() {
    
        const response = await fetch("/api/products");
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const products = await response.json();

        return (
            <div className={styles.catalogue}>
                <Hero title="Catalogue" description="Browse our selection of products" />
                <h1>Catalogue</h1>
                <div className={styles.catalogue__container}>
                    {products.map((product) => (
                        <div key={product.id} className={styles.catalogue__product}>
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <div className={styles.catalogue__product__price}>
                                <span>Price</span>
                                <span>{product.priceA}</span>
                                <span>{product.priceB}</span>
                                <span>{product.priceC}</span>
                                <span>{product.priceD}</span>
                                <span>{product.priceE}</span>
                                <span>{product.priceNG}</span>
                                <span>{product.priceP}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    
}