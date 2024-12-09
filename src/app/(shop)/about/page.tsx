import { Title } from "@/components";
import styles from "./page.module.css";
import Link from "next/link";
import { getCategories } from "@/actions";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoWhatsapp,
} from "react-icons/io5";
import { Map } from "@/components";
import AlertMessage from "@/components/ui/alert/AlertMessage";

export default async function AboutPage() {
  const categories = await getCategories();
  return (
    <>
      <div className={styles.container}>
        {/* <AlertMessage alertMessage="RECUERDA QUE ESTA ES UNA TIENDA DE PRUEBA. 
        Por favor, utiliza cuentas de prueba para realizar los pagos"/> */}
        <div>
          <Title title="Teslo Shop" />
          <h3>La tienda de indumentaria online más grande de Argentina</h3>
        </div>
        <div className={styles.aboutContainer}>
          <div>
            <section>
              <div className={styles.categoriesContainer}>
                <p>
                  Contamos con indumentaria masculina, femenina, para niños y
                  unisex.
                  <br />
                  Visita nuestra ámplia gama de productos:
                </p>

                <div className={styles.categoriesLinksContainer}>
                  <Link href="/gender/men" className={styles.categoryLink}>
                    Ropa para<span>hombres</span>
                  </Link>
                  <Link href="/gender/women" className={styles.categoryLink}>
                    Ropa para<span>mujeres</span>
                  </Link>
                  <Link href="/gender/kid" className={styles.categoryLink}>
                    Ropa para<span>niños</span>
                  </Link>
                  {/* <Link href="/category/" className={styles.categoryLink}>Ropa<span>unisex</span></Link> */}
                </div>
              </div>

              <div className={styles.typesContainer}>
                <p>
                  También podrás encontrar indumentaria de las siguientes
                  categorías:
                </p>
                <ul>
                  {categories?.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/category/${category.name}`}
                        className={styles.categoryLink}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
          <aside>
            <div className={styles.socialContainer}>
              <h3>Visita nuestras redes sociales</h3>
              <h4>Entérate de nuevos productos y las súper ofertas </h4>
              <span>que tenemos para vos</span>
              <p>(De momento las redes sociales no están disponibles)</p>
              <svg width="0" height="0">
                  <defs>
                    <radialGradient
                      id="gradient-instagram"
                      cx="80%"
                      cy="50%"
                      r="110%"
                      gradientTransform="rotate(45)"
                    >
                      <stop offset="10%" stopColor="#feda75" /> {/*lightYellow*/}
                      <stop offset="25%" stopColor="#fa7e1e" /> {/*orange*/}
                      <stop offset="50%" stopColor="#d62976" /> {/*pink*/}
                      <stop offset="75%" stopColor="#962fbf" /> {/*purple*/}
                      <stop offset="100%" stopColor="#4f5bd5" /> {/*blue*/}
                    </radialGradient>
                  </defs>
                </svg>
              <div className={styles.socialWebsContainer}>
                <IoLogoWhatsapp className={styles.logoWhatsApp} />
                <IoLogoInstagram style={{ fill: "url(#gradient-instagram)" }} />
                <IoLogoFacebook className={styles.logoFacebook} />
                <IoLogoTwitter className={styles.logoTwitter} />
              </div>
            </div>
          </aside>
        </div>
        <div className={styles.mapContainer}>
          <p>
            También visita nuestro local en: <br />
            Avenida Siempre Viva 742 Springfield
          </p>
          <div className={styles.map}>
            <Map />
            {/* Coordenadas de Buenos Aires */}
          </div>
        </div>
      </div>
    </>
  );
}
