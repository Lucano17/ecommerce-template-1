import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        title: true,
        price: true,
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error al buscar productos:", error);
    return NextResponse.json({ error: "Error al buscar productos" }, { status: 500 });
  }
}
