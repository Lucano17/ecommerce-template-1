// product-pagination.ts

"use server"

import prisma from "@/lib/prisma"
import { Gender } from "@prisma/client";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
  category?: string;
  sortBy?: string; // Agregar el campo sortBy
  query?: string
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender,
  category,
  sortBy = "price_asc", // Valor por defecto si no se pasa sortBy
  query,
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

    if (query) {
      whereClause.OR = [
        {title: {contains: query, mode: "insensitive"}},
        {category: {name: {contains: query, mode: "insensitive"}}},
      ]
    }

    // Lógica para ordenar los productos
    let orderBy: any = {};
    
    if (sortBy === "price_asc") {
      orderBy = { price: "asc" };
    } else if (sortBy === "price_desc") {
      orderBy = { price: "desc" };
    } else if (sortBy === "name_asc") {
      orderBy = { title: "asc" };
    } else if (sortBy === "name_desc") {
      orderBy = { title: "desc" };
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
      orderBy, // Aplicar el orden
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
