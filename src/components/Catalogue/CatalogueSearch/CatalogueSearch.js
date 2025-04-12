"use client";

import { useState } from "react";
import Image from "next/image";
import searchIcon from '@/assets/search-svgrepo-com.svg';
import styles from "./CatalogueSearch.module.scss";

export default function CatalogueSearch({ updateList }) {
  const [parameter, setParameter] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const parameter = e.target.elements.parameter.value;
    console.log(parameter);
    updateList(parameter);
  };

  const parameterHandler = (e) => {
    setParameter(e.target.value);
  };

  const cleanHandler = () => {
    updateList("");
    setParameter("");
  };

  return (
    <form className={styles.catalogueSearch} onSubmit={submitHandler}>
      <div className={styles.catalogueSearch__container}>
        <input type="text" name="parameter" value={parameter} onChange={parameterHandler} placeholder="Buscar producto..."></input>
        <button onClick={() => updateList("a")}>
            <Image src={searchIcon} alt="search" width={20} height={20} />
        </button>
      </div>
      {parameter.length > 0 && <button className={styles.clean} onClick={cleanHandler}>Limpiar búsqueda</button>}
    </form>
  );
}
