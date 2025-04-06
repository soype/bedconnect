import styles from "./Catalogue.module.scss";
import Hero from "@/components/Hero/Hero";
import CatalogueItem from "@/components/Catalogue/CatalogueItem/CatalogueItem";
import Catalogue from "@/components/Catalogue/Catalogue/Catalogue";

export default function CataloguePage() {

    const dummyProduct = {"code": "P", "provider": "SHIVA", "name": "SHIVA PIMENTON 100G", "cost": 1150, "priceA": 1453, "priceB": 1428, "priceC": 1311, "priceD": null, "priceE": 1291, "priceNG": null, "priceP": 2093, "costoVital": 1173, "volume": 0.033, "costoNG": null, "criticalStock": 200, "gluten": true, "vegan": true, "organic": false, "keto": false, "kosher": true, "aplv": false, "nosugar": false, "noconservants": true, "expireTime": 6};

  return (
    <div className={styles.catalogue}>
      <Hero title="Catalogue" description="Browse our selection of products" />
      <Catalogue />
       {/* <CatalogueItem product={dummyProduct} userCategory={'a'} key={dummyProduct.id} /> */}
    </div>
  );
}
