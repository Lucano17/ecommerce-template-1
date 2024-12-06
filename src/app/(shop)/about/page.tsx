import { Title } from "@/components";
import styles from "./page.module.css";
import Link from "next/link";
import { Category } from "@prisma/client";
import { getCategories } from "@/actions";



export default async function AboutPage() {
  const categories = await getCategories();
  return (
    <>
    <div>
      <h2>Tienda de ropa</h2>
      <Title title="Teslo Shop"/>
      <h3>La tienda de indumentaria online más grande de Argentina</h3>
      <p>Contamos con indumentaria masculina, femenina, para niños y unisex.<br/>
      Visita nuestra ámplia gama de productos</p>

      <div>
      <Link href="/category/men">Ropa para hombres</Link>
      <Link href="/category/">Ropa para mujeres</Link>
      <Link href="/category/">Ropa para niños</Link>
      <Link href="/category/">Ropa unisex</Link>
      </div>

      <p>También podrás encontrar indumentaria de las siguientes categorías:</p>

      
        <ul>
        {categories?.map((category) => (
          <li key={category.id}>
            <Link
              href={`/category/${category.name}`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
      
      <p>También visita nuestro local en: <br />
      Avenida Siempre Viva 742
      Springfield</p>

      
    </div>
    </>
  );
}
