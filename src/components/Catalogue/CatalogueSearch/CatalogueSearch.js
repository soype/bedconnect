'use client'

import {useState} from 'react';

import styles from './CatalogueSearch.module.scss';

export default function CatalogueSearch({updateList, hasSearched}) {

    const [parameter, setParameter] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        const parameter = e.target.elements.parameter.value;
        console.log(parameter);
        updateList(parameter);
    }

    const parameterHandler = (e) => {
        setParameter(e.target.value);
    }

    const cleanHandler = () => {
        updateList('');
        setParameter('');
    }

    return (
        <form className={styles.catalogueSearch} onSubmit={submitHandler}>
            <input type="text" name="parameter" value={parameter} onChange={parameterHandler} placeholder="Buscar por producto..."></input>
            <button onClick={() => updateList('a')}>Buscar</button>
            {hasSearched && <button onClick={cleanHandler}>Limpiar</button>}
        </form>
    )
}