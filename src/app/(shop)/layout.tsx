import "../globals.css";
import type { Metadata } from "next";
import { inter, geistMono, geistSans } from "@/./fonts/fonts";
import { SideBar, TopMenu } from "@/components";
import Footer from "@/components/ui/footer/Footer";

export const metadata: Metadata = {
  title: "Ecommerce-template-1",
  description: "Generated by create next app",
};

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en">
    //   <body className={`${geistSans.variable} ${geistMono.variable}`}>
    <main>
      <TopMenu />
      <SideBar />
      <div>{children}</div>
      <Footer/>
    </main>
    //   </body>
    // </html>
  );
}
