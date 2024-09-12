import {Inter, Montserrat_Alternates} from "next/font/google"
import localFont from "next/font/local";

export const geistSans = localFont({
    src: "./GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
  });
export const geistMono = localFont({
    src: "./GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
  });

export const inter = Inter({subsets: ["latin"]})

export const titleFont = Montserrat_Alternates({
    subsets: ["latin"],
    weight: ["500", "700"]
})