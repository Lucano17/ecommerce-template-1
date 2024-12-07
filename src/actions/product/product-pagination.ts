"use server"

import prisma from "@/lib/prisma"
import { Category, Gender } from "@prisma/client";



interface PaginationOptions {
    page?: number;
    take?: number;
    gender?: Gender;
    category?: string;
  }
  
  export const getPaginatedProductsWithImages = async ({
    page = 1,
    take = 12,
    gender,
    category,
  }: PaginationOptions) => {
    try {
      const whereClause: any = {};
  
      if (gender) {
        whereClause.gender = gender;
      }
  
      if (category) {
        whereClause.category = {
          name: category,
        };
      }
  
      const products = await prisma.product.findMany({
        take,
        skip: (page - 1) * take,
        include: {
          ProductImage: {
            take: 2,
            select: { url: true },
          },
        },
        where: whereClause,
      });
  
      const totalCount = await prisma.product.count({ where: whereClause });
      const totalPages = Math.ceil(totalCount / take);
  
      return {
        currentPage: page,
        totalPages,
        products: products.map((product) => ({
          ...product,
          images: product.ProductImage.map((image) => image.url),
        })),
      };
    } catch (error) {
      console.error("Error al cargar los productos:", error);
      throw new Error("No se pudieron cargar los productos");
    }
  };
  