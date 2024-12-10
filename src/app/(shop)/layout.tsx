import "../globals.css";
import type { Metadata } from "next";
// import { inter, geistMono, geistSans } from "@/fonts/fonts";
import { SideBar, TopMenu } from "@/components";
import Footer from "@/components/ui/footer/Footer";
import styles from "./layout.module.css"

export const metadata: Metadata = {
  title: {
    template: "%s - E-commerce-template-1 | Shop",
    default: "Home - E-commerce-template-1 | Sho",
  },
  description: "Una tienda de productos",
};

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en">
    //   <body className={`${geistSans.variable} ${geistMono.variable}`}>
    <div className={styles.container}>
      <main className={styles.main}>
      <div>
        <div className={styles.topMenu}>
          
      <TopMenu/>
        </div>
      <SideBar />
      <div className={styles.childrenContainer}>{children}</div>
      </div>
    </main>
      <footer className={styles.footer}>

      <Footer/>
      </footer>
    </div>
    //   </body>
    // </html>
  );
}
