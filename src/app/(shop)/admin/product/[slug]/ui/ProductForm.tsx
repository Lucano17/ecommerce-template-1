"use client";

import { Product } from "@/interfaces";
import styles from "./ProductForm.module.css";

interface Props {
  product: Product;
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({ product }: Props) => {
  return (
    <form className={styles.formContainer}>
      {/* Textos */}
      <div className={styles.productDataContainer}>
        <div className={styles.productData}>
          <span>Título</span>
          <input type="text" />
        </div>

        <div className={styles.productData}>
          <span>Slug</span>
          <input type="text" />
        </div>

        <div className={styles.productData}>
          <span>Descripción</span>
          <textarea rows={5}></textarea>
        </div>

        <div className={styles.productData}>
          <span>Price</span>
          <input type="number" />
        </div>
      </div>

      {/* Selector de tallas y fotos */}
      <div className={styles.productDataContainer}>
        {/* As checkboxes */}

        <div className={styles.productData}>
          <div className={styles.sizesTitle}>
            <span>Tallas</span>
          </div>
          <div className={styles.sizeMap}>
            {sizes.map((size) => (
              <div key={size} className={styles.sizes}>
                <span>{size}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.productData}>
          <span>Gender</span>
          <select>
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className={styles.productData}>
          <span>Tags</span>
          <input type="text" />
        </div>

        <div className={styles.productData}>
          <span>Categoría</span>
          <select>
            <option value="">[Seleccione]</option>
          </select>
        </div>
        <div className={styles.productData}>
          <span className={styles.photos}>Fotos</span>
          <input
            className={styles.photosInput}
            type="file"
            multiple
            accept="image/png, image/jpeg"
          />
        </div>
        <button className={styles.saveButton}>Guardar</button>
      </div>
    </form>
  );
};
