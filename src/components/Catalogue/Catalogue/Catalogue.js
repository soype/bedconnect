'use client'

import styles from './Catalogue.module.scss'
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import CatalogueItem from '../CatalogueItem/CatalogueItem';

export default function Catalogue() {

    const [products, setProducts] = useState([]);
    const isLogged = useAuth().isLogged;

    useEffect(() => {
        if(!isLogged) return;
        const fetchData = async () => {
            const response = await fetch('/api/products');
            const data = await response.json();
            // console.log(data);
            setProducts(data);
        };
        fetchData();
    }, [isLogged]);

    return(
        <div className={styles.catalogue__container}>
            <table className={styles.catalogueTable}>
                <thead>
                    <tr>
                        <th>PRODUCTO</th>
                        <th>Precio x unidad</th>
                        <th className={styles.verticalText}>SIN GLUTEN</th>
                        <th className={styles.verticalText}>VEGANO</th>
                        <th className={styles.verticalText}>ORGÁNICO</th>
                        <th className={styles.verticalText}>KETO</th>
                        <th className={styles.verticalText}>APLV</th>
                        <th className={styles.verticalText}>SIN AZÚCAR AGREGADA</th>
                        <th className={styles.verticalText}>SIN CONSERVANTES</th>
                        <th>Vto. <br></br> (meses)</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                    <CatalogueItem product={product} userCategory={'a'} key={product.id} />
                    ))}
                </tbody>
            </table>
        </div>
        )
}