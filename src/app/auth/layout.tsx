import type { Metadata } from "next";

import { inter, geistMono, geistSans } from "@/./fonts/fonts";
import "../globals.css";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Ecommerce-template-1",
  description: "Generated by create next app",
};

export default async function Account({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()

  if (session?.user) {
    redirect("/")
  }

  return (
    <main>
      <div>{children}</div>
    </main>
  );
}
