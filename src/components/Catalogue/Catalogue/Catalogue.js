'use client'

import styles from './Catalogue.module.scss'
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import CatalogueItem from '../CatalogueItem/CatalogueItem';
import CatalogueSearch from '../CatalogueSearch/CatalogueSearch';

export default function Catalogue() {

    const [products, setProducts] = useState([]);
    const [updatedList, setUpdatedList] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const isLogged = useAuth().isLogged;

    useEffect(() => {
        if(!isLogged) return;
        const fetchData = async () => {
            const response = await fetch('/api/products');
            const data = await response.json();
            // console.log(data);
            setProducts(data);
            setUpdatedList(data);
        };
        fetchData();
    }, []);

    const updateListHandler = (parameter) => {
        if(parameter.length < 1){
            setUpdatedList(products);
            setHasSearched(false);
            return;
        }
        const filtered = products.filter(item => 
            item.name.toLowerCase().includes(parameter.toLowerCase())
        );
        setHasSearched(true);
        console.log(filtered);
        setUpdatedList(filtered);
    }

    return(
        <div className={styles.catalogue}>
            <div className={styles.catalogue__container}>
                <CatalogueSearch updateList={updateListHandler} hasSearched={hasSearched}></CatalogueSearch>
                <table className={styles.catalogueTable}>
                    <thead>
                        <tr>
                            <th>PRODUCTO</th>
                            <th>Precio x unidad</th>
                            <th className={styles.verticalText}>AGREGAR</th>
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
                        {updatedList.map((product) => (
                        <CatalogueItem product={product} userCategory={'a'} key={product.id} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        )
}