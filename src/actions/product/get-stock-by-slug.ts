// get-stock-by-slug.ts
"use server";

import prisma from "@/lib/prisma";
import { sleep } from "@/utils";

export const getStockBySlug = async (slug: string): Promise<number> => {
  try {
    // await sleep(1)
    const stock = await prisma.product.findFirst({
      where: { slug },
      select: { inStock: true },
    });
    
    // Log the stock value obtained from Prisma
    console.log("Stock from Prisma:", stock);
    
    return stock?.inStock ?? 0; // Return stock or 0 if undefined
  } catch (error) {
    console.error("Error fetching stock:", error);
    return 0; // Return 0 on error
  }
};