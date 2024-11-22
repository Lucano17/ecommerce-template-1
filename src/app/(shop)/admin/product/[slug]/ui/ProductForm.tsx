"use client";

import { Category, Product } from "@/interfaces";
import styles from "./ProductForm.module.css";
import { useForm } from "react-hook-form";

interface Props {
  product: Product;
  categories: Category[];
}

interface FormInputs {
    title: string;
    slug: string;
    description: string;
    price: number;
    inStock: number;
    sizes: string[];
    tags: string;
    gender: "men" | "women" | "kid" | "unisex";
    categoryId: string;
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({ product, categories }: Props) => {
    const {
        handleSubmit,
        register,
        formState: {isValid},
    } = useForm<FormInputs>({
        defaultValues: {
            ...product,
            tags: product.tags.join(", "),
            sizes: product.sizes ?? [],
        }
    });


  return (
    <form className={styles.formContainer}>
      {/* Textos */}
      <div className={styles.productDataContainer}>
        <div className={styles.productData}>
          <span>Título</span>
          <input type="text" {...register("title", {required: true})}/>
        </div>

        <div className={styles.productData}>
          <span>Slug</span>
          <input type="text" {...register("slug", {required: true})}/>
        </div>

        <div className={styles.productData}>
          <span>Descripción</span>
          <textarea rows={5} {...register("description", {required: true})}></textarea>
        </div>

        <div className={styles.productData}>
          <span>Price</span>
          <input type="number" {...register("price", {required: true, min: 0})}/>
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
          <select {...register("gender", {required: true})}>
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className={styles.productData}>
          <span>Tags</span>
          <input type="text" {...register("tags", {required: true})}/>
        </div>

        <div className={styles.productData}>
          <span>Categoría</span>
          <select {...register("categoryId", {required: true})}>
            <option value="">[Seleccione]</option>
                {
                    categories?.map(category =>( 
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))
                }
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
