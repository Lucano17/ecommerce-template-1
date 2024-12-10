import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import React from "react";
import styles from "./page.module.css"
import { ProfileData } from "./ui/ProfileData";

interface Props {
  email: string;
  name: string;
  password: string;
};

export default async function ProfilePage ({email, name, password}: Props) {
  const session = await auth();
  if (!session?.user) {
    // redirect('/auth/login?returnTo=/perfil')
    redirect("/");
  }

  return (
    <div className={styles.container}>
      <Title title="Perfil" />

      {/* <pre>{JSON.stringify(session.user, null, 2)}</pre> */}
      <ProfileData email={email} name={name} password={password}/>
    </div>
  );
};
