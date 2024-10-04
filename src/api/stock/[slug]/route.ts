// src/app/api/stock/[slug]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Asegúrate de que prisma esté bien importado

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  try {
    const product = await prisma.product.findFirst({
      where: { slug: slug },
      select: { inStock: true },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ inStock: product.inStock });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching stock' }, { status: 500 });
  }
}
