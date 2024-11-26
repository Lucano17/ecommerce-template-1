"use client";

import { Category, Product, ProductImage } from "@/interfaces";
import styles from "./ProductForm.module.css";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createUpdateProduct } from "@/actions";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductImage[] };
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

  images?: FileList;
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({ product, categories }: Props) => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    product.sizes ?? []
  );

  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(", "),
      sizes: product.sizes ?? [],
      images: undefined,
    },
  });

  const toggleSize = (size: string) => {
    const sizes = new Set(getValues("sizes"));
    sizes.has(size) ? sizes.delete(size) : sizes.add(size);
    setSelectedSizes(Array.from(sizes));
    setValue("sizes", Array.from(sizes));
  };

  // watch("sizes") para renderizar siempre que los sizes cambien

  const onSubmit = async (data: FormInputs) => {
    const { images, ...productToSave } = data;
    const formData = new FormData();

    if (product.id) {
      formData.append("id", product.id ?? "");
    }

    formData.append("title", productToSave.title ?? "");
    formData.append("slug", productToSave.slug ?? "");
    formData.append("description", productToSave.description ?? "");
    formData.append("price", productToSave.price.toString() ?? "0");
    formData.append("inStock", productToSave.inStock.toString() ?? "0");
    formData.append("sizes", productToSave.sizes.toString() ?? "");
    formData.append("tags", productToSave.tags ?? "");
    formData.append("categoryId", productToSave.categoryId ?? "");
    formData.append("gender", productToSave.gender ?? "");

    const { ok } = await createUpdateProduct(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <div className={styles.productDataContainer}>
        <div className={styles.productData}>
          <span>Título</span>
          <input type="text" {...register("title", { required: true })} />
        </div>

        <div className={styles.productData}>
          <span>Slug</span>
          <input type="text" {...register("slug", { required: true })} />
        </div>

        <div className={styles.productData}>
          <span>Descripción</span>
          <textarea
            rows={5}
            {...register("description", { required: true })}
          ></textarea>
        </div>

        <div className={styles.productData}>
          <span>Price</span>
          <input
            type="number"
            {...register("price", { required: true, min: 0 })}
          />
        </div>
        <div className={styles.productData}>
          <span>Inventario</span>
          <input
            type="number"
            {...register("inStock", { required: true, min: 0 })}
          />
        </div>
      </div>

      {/* Selector de tallas y fotos */}
      <div className={styles.productDataContainer}>
        {/* As checkboxes */}

        <div className={styles.productData}>
          <div className={styles.sizesTitle}>
            <span>Tallas disponibles</span>
          </div>
          <div className={styles.sizeMap}>
            {sizes.map((size) => (
              <div key={size} className={styles.sizes}>
                <span
                  className={
                    selectedSizes.includes(size)
                      ? styles.sizeSelected
                      : styles.sizeNonSelected
                  }
                  onClick={() => toggleSize(size)}
                >
                  {size}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.productData}>
          <span>Gender</span>
          <select {...register("gender", { required: true })}>
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className={styles.productData}>
          <span>Tags</span>
          <input type="text" {...register("tags", { required: true })} />
        </div>

        <div className={styles.productData}>
          <span>Categoría</span>
          <select {...register("categoryId", { required: true })}>
            <option value="">[Seleccione]</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
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
          <div className={styles.photosGrid}>
            {product.ProductImage?.map((image) => (
              <div key={image.id}>
                <div className={styles.imageContainer}>
                  <Image
                    alt={product.title ?? ""}
                    src={`/products/${image.url}`}
                    width={75}
                    height={75}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      console.log(image.id, image.url);
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className={styles.saveButton}>Guardar</button>
      </div>
    </form>
  );
};
