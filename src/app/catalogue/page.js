'use client'

import { useState, useEffect } from "react";
import styles from "./Catalogue.module.scss";
import Hero from "@/components/Hero/Hero";

export const dynamic = 'force-dynamic'; // Add this line

export default function Catalogue() {

    const [products, setProducts] = useState([]);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/products');
            const data = await response.json();
            console.log(data)
            setProducts(data);
        };
        fetchData();
    }, [fetched])

  return (
    <div className={styles.catalogue}>
      <Hero title="Catalogue" description="Browse our selection of products" />
      <h1>Catalogue</h1>
    <button onClick={() => setFetched(!fetched)}>Fetch data</button>
      <div className={styles.catalogue__container}>
        {products.map((product) => (
          <div key={product.id} className={styles.catalogue__product}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <div className={styles.catalogue__product__price}>
              <span>Price</span>
              <span>{product.pricea}</span>
              <span>{product.priceb}</span>
              <span>{product.pricec}</span>
              <span>{product.priced}</span>
              <span>{product.pricee}</span>
              <span>{product.priceng}</span>
              <span>{product.pricep}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}