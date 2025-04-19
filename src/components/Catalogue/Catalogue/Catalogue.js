'use client'

import styles from './Catalogue.module.scss'
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import CatalogueItem from '../CatalogueItem/CatalogueItem';
import CatalogueSearch from '../CatalogueSearch/CatalogueSearch';

export default function Catalogue() {

    const [products, setProducts] = useState([]);
    const [updatedList, setUpdatedList] = useState([]);
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
            return;
        }
        const filtered = products.filter(item => 
            item.name.toLowerCase().includes(parameter.toLowerCase())
        );
        console.log(filtered);
        setUpdatedList(filtered);
    }

    return(
        <div className={styles.catalogue}>
            <div className={styles.catalogue__container}>
                <CatalogueSearch updateList={updateListHandler}></CatalogueSearch>
                <table className={styles.catalogueTable}>
                    <thead>
                        <tr>
                            <th className={styles.thBottom}>PRODUCTO</th>
                            <th className={styles.thBottom}>Precio x unidad</th>
                            <th className={styles.verticalText}>AGREGAR</th>
                            <th className={styles.verticalText}>SIN GLUTEN</th>
                            <th className={styles.verticalText}>VEGANO</th>
                            <th className={styles.verticalText}>ORGÁNICO</th>
                            <th className={styles.verticalText}>KETO</th>
                            <th className={styles.verticalText}>APLV</th>
                            <th className={styles.verticalText}>SIN AZÚCAR <br/>AGREGADA</th>
                            <th className={styles.verticalText}>SIN<br/>CONSERVANTES</th>
                            <th className={styles.thBottom}>Vto. <br></br> (meses)</th>
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