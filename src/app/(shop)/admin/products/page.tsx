import { Pagination, ProductImage, Title } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";
import styles from "./page.module.css";
import Link from "next/link";
import { currencyFormat } from "@/utils";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function ProductsManagmentPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page });

  return (
    <>
      <Title title="Mantenimiento de productos" />
      <div className={styles.container}>
      <Link
      href="/admin/product/new"
      className={styles.addProduct}>Crear nuevo producto</Link>
        <table>
          <thead>
            <tr>
              <th>#ID</th>
              <th>Imagen</th>
              <th>Título</th>
              <th>Precio</th>
              <th>Género</th>
              <th>Inventario</th>
              <th>Tallas</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product.id}>
                <td>{product.id.split("-").at(0)}</td>
                <td>
                  <Link href={`/product/${product.slug}`}>
                    <ProductImage
                      src={product.ProductImage[0]?.url}
                      width={80}
                      height={80}
                      alt={product.title}
                    />
                  </Link>
                </td>
                <td>
                  <Link href={`/admin/product/${product.slug}`}>
                    {product.title}
                  </Link>
                </td>
                <td>{currencyFormat(product.price)}</td>
                <td>{product.gender}</td>
                <td>{product.inStock}</td>
                <td>{product.sizes.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination totalPages={totalPages} />
    </>
  );
}
