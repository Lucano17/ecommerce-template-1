"use server";

import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";

export const userUpdate = async (email: string, name?: string, password?: string) => {
  const hashedPassword = password ? await hash(password, 10) : undefined;

  console.log("Datos enviados a Prisma:", { email, name, hashedPassword });

  const updatedUser = await prisma.user.update({
    where: { email },
    data: {
      ...(name && { name }),
      ...(password && { password: hashedPassword }),
    },
  });

  console.log("Usuario actualizado:", updatedUser);

  return updatedUser;
};
