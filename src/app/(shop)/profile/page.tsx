import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import React from "react";
import styles from "./page.module.css";
import { ProfileClientComponent } from "./ui/profile-components/ProfileClientComponent";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  // Obtain uploaded data from database
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect("/");
  }

  return (
    <div className={styles.container}>
      <Title title="Perfil" />
      <ProfileClientComponent user={user} />
    </div>
  );
}
