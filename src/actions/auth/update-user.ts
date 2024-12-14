"use server";

import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";

export const userUpdate = async (email: string, name?: string, password?: string) => {
  const hashedPassword = password ? await hash(password, 10) : undefined;

  return await prisma.user.update({
    where: { email },
    data: {
      name,
      ...(hashedPassword && { password: hashedPassword }),
    },
  });
};
