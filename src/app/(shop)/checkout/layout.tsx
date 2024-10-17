import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function ChechoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login?returnTo=/checkout/address");
  }

  return <>{children}</>;
}
