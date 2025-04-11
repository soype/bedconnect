'use client'

import styles from './CatalogueSearch.module.scss';

export default function CatalogueSearch({updateList, hasSearched}) {

    const submitHandler = (e) => {
        e.preventDefault();
        const parameter = e.target.elements.parameter.value;
        console.log(parameter);
        updateList(parameter);
    }

    return (
        <form className={styles.catalogueSearch} onSubmit={submitHandler}>
            <input type="text" name="parameter" placeholder="Buscar por producto..."></input>
            <button onClick={() => updateList('a')}>Buscar</button>
            {hasSearched && <button onClick={() => updateList('')}>Limpiar</button>}
        </form>
    )
}